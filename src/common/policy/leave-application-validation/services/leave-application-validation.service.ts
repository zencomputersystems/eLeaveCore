import { Injectable } from '@nestjs/common';
import { LeaveTypePropertiesXmlDTO } from 'src/admin/leavetype-entitlement/dto/xml/leavetype-properties.xml.dto';
import moment = require("moment");
import { ApplyLeaveDTO } from 'src/api/leave/dto/apply-leave.dto';
import { ValidationStatusDTO } from '../dto/validation-status.dto';
import { UserInfoModel } from 'src/admin/user-info/model/user-info.model';
import { DateCalculationService } from 'src/common/calculation/service/date-calculation.service';
import { LeaveBalanceValidationService } from './leave-balance-validation.service';
import { UserLeaveEntitlementModel } from 'src/api/userprofile/model/user-leave-entitlement.model';
import { LeaveTransactionDbService } from 'src/api/leave/db/leave-transaction.db.service';
import { map, mergeMap } from 'rxjs/operators';

/**
 * Service for leave application validation
 *
 * @export
 * @class LeaveApplicationValidationService
 */
@Injectable()
export class LeaveApplicationValidationService {

    /**
     *Creates an instance of LeaveApplicationValidationService.
     * @param {DateCalculationService} dateCalculationService
     * @param {LeaveBalanceValidationService} balanceValidationService
     * @param {LeaveTransactionDbService} leaveTransactionDbService
     * @memberof LeaveApplicationValidationService
     */
    constructor(
        private readonly dateCalculationService: DateCalculationService,
        private readonly balanceValidationService: LeaveBalanceValidationService,
        private readonly leaveTransactionDbService: LeaveTransactionDbService) { }

    /**
     * Method validate leave
     *
     * @param {LeaveTypePropertiesXmlDTO} policy
     * @param {ApplyLeaveDTO} applyLeaveDTO
     * @param {UserInfoModel} userInfo
     * @param {UserLeaveEntitlementModel[]} userEntitlement
     * @returns
     * @memberof LeaveApplicationValidationService
     */
    // public validateLeave(
    //     policy: LeaveTypePropertiesXmlDTO,
    //     applyLeaveDTO: ApplyLeaveDTO,
    //     userInfo: UserInfoModel,
    //     userEntitlement: UserLeaveEntitlementModel[]) {
    public validateLeave([policy, applyLeaveDTO, userInfo, userEntitlement]: [LeaveTypePropertiesXmlDTO, ApplyLeaveDTO, UserInfoModel, UserLeaveEntitlementModel[]]) {

        const validationStatus = new ValidationStatusDTO();


        const startDateTemp = applyLeaveDTO.data[0].startDate;
        const endDatetemp = applyLeaveDTO.data[applyLeaveDTO.data.length - 1].endDate;

        const extraFilter = [];
        const halfDayFilter = applyLeaveDTO.data.find(x => x.dayType === 1);
        const quarterDayFilter = applyLeaveDTO.data.find(x => x.dayType === 2);

        if (halfDayFilter) {
            // console.log(halfDayFilter);
            extraFilter.push('(TIME_SLOT = ' + halfDayFilter.slot + ')');
        }
        if (quarterDayFilter) {
            // console.log(quarterDayFilter);
            extraFilter.push('(TIME_SLOT = ' + quarterDayFilter.quarterDay + ')');
        }

        const startDate = this.convertDateToMoment(startDateTemp);
        const endDate = this.convertDateToMoment(endDatetemp);

        return this.validateOverlapLeave([startDateTemp, endDatetemp, userInfo, extraFilter])
            .pipe(
                map((result: boolean) => {
                    if (!result) {
                        // validationStatus.message.push("You have applied another leave between this date");
                        validationStatus.message.push("Leave unsuccessfully submitted due to another leave has been applied between this date");

                    }
                }),
                mergeMap(res => {

                    return this.validateBalance([userInfo, applyLeaveDTO, userEntitlement])
                        .pipe(map((validateBalanceResult: boolean) => {
                            if (!validateBalanceResult) {
                                validationStatus.message.push("Leave balance not enough");
                            }

                            if (!this.allowAdvancedLeave([policy, startDate, endDate])) {
                                validationStatus.message.push("Cannot apply advanced leave");
                            }

                            if (!this.allowNextYearApplciation([policy, startDate, endDate])) {
                                validationStatus.message.push("Cannot apply leave on the following year");
                            }

                            if (!this.allowAfterConfirm(policy, this.convertDateToMoment(new Date(userInfo.CONFIRMATION_DATE)))) {
                                validationStatus.message.push("Cannot apply before confirm");
                            }

                            if (!this.validateApplyBefore(policy, startDate)) {
                                validationStatus.message.push("You need to apply " + policy.applyBeforeProperties.numberOfDays + " Days before");
                            }

                            // apply within will be overwited by apply before properties if available
                            if (policy.applyBeforeProperties.numberOfDays == 0 || policy.applyBeforeProperties.numberOfDays == null) {
                                if (!this.validateApplyWithin(policy, endDate)) {
                                    validationStatus.message.push("You need to apply within " + policy.applyWithinProperties.numberOfDays + " days after leave end");
                                }
                            }

                            if (!this.allowedDay(policy, applyLeaveDTO)) {
                                validationStatus.message.push("Leave duration exceed " + policy.maxDayPerLeave + " allowed days");
                            }

                            if (validationStatus.message.length == 0) {
                                validationStatus.valid = true;
                            }

                            return validationStatus;
                        })
                        )
                })
            )

    }

    /**
     * Method validate balance
     *
     * @private
     * @param {UserInfoModel} userInfo
     * @param {ApplyLeaveDTO} applyLeaveDTO
     * @param {UserLeaveEntitlementModel[]} userEntitlement
     * @returns
     * @memberof LeaveApplicationValidationService
     */
    // private validateBalance(userInfo: UserInfoModel, applyLeaveDTO: ApplyLeaveDTO, userEntitlement: UserLeaveEntitlementModel[]) {

    private validateBalance([userInfo, applyLeaveDTO, userEntitlement]: [UserInfoModel, ApplyLeaveDTO, UserLeaveEntitlementModel[]]) {
        const balance = this.balanceValidationService.validateLeaveBalance([userInfo, applyLeaveDTO, userEntitlement]);

        return balance;
    }

    // check if employee can apply more than current date
    /**
     * Method allow advance leave
     * check if employee can apply more than current date
     *
     * @private
     * @param {LeaveTypePropertiesXmlDTO} policy
     * @param {moment.Moment} startDate
     * @param {moment.Moment} endDate
     * @returns {boolean}
     * @memberof LeaveApplicationValidationService
     */
    // private allowAdvancedLeave(policy: LeaveTypePropertiesXmlDTO, startDate: moment.Moment, endDate: moment.Moment): boolean {

    private allowAdvancedLeave([policy, startDate, endDate]: [LeaveTypePropertiesXmlDTO, moment.Moment, moment.Moment]): boolean {

        const currentDate = moment(new Date(), 'YYYY-MM-DD');

        if (policy.applyInAdvance || startDate <= currentDate && endDate <= currentDate) {
            return true;
        }

        return false;
    }

    // check if user can apply next year application
    // if allow advanced leave is false, this parameter by default is false
    /**
     * Method allow next year application
     * check if user can apply next year application
     * if allow advanced leave is false, this parameter by default is false
     *
     * @private
     * @param {LeaveTypePropertiesXmlDTO} policy
     * @param {moment.Moment} startDate
     * @param {moment.Moment} endDate
     * @returns {boolean}
     * @memberof LeaveApplicationValidationService
     */
    // private allowNextYearApplciation(policy: LeaveTypePropertiesXmlDTO, startDate: moment.Moment, endDate: moment.Moment): boolean {

    private allowNextYearApplciation([policy, startDate, endDate]: [LeaveTypePropertiesXmlDTO, moment.Moment, moment.Moment]): boolean {

        if (!policy.applyInAdvance) {
            policy.applyNextYear = false;
        }
        // next year 
        const nextYear = new Date().getFullYear() + 1;

        // if (policy.applyNextYear || (startDate.year() <= nextYear && endDate.year() <= nextYear)) {
        if (policy.applyNextYear || (startDate.year() < nextYear && endDate.year() < nextYear)) {
            return true;
        }
        return false;
    }

    /**
     * Method validate attachment
     *
     * @private
     * @param {LeaveTypePropertiesXmlDTO} policy
     * @returns {boolean}
     * @memberof LeaveApplicationValidationService
     */
    private validateAttachment(policy: LeaveTypePropertiesXmlDTO): boolean {
        return false;
    }

    // check if date applied if before the policy date
    // if short notice application is allowed, by default will return true
    /**
     * Method validate apply before
     * check if date applied if before the policy date
     * if short notice application is allowed, by default will return true
     *
     * @private
     * @param {LeaveTypePropertiesXmlDTO} policy
     * @param {moment.Moment} startDate
     * @returns {boolean}
     * @memberof LeaveApplicationValidationService
     */
    private validateApplyBefore(policy: LeaveTypePropertiesXmlDTO, startDate: moment.Moment): boolean {

        if (policy.applyBeforeProperties.isAllowShortNotice.isCheck) {
            return true;
        }

        const currentDate = moment(new Date(), 'YYYY-MM-DD').startOf('day');

        // find the date duration between start date and current date
        // check if rest day and holiday is included or not
        const dayDifference = this.dateCalculationService.getDayDuration([currentDate, startDate, policy.applyBeforeProperties.excludeDayType.isExcludeHoliday, policy.applyBeforeProperties.excludeDayType.isExcludeRestDay]);

        if (dayDifference > policy.applyBeforeProperties.numberOfDays) {
            return true;
        }

        return false;
    }

    // end date must be within the specified date after leave end otherwise consider as backdated if allowed
    /**
     * method validate apply within
     * end date must be within the specified date after leave end otherwise consider as backdated if allowed
     *
     * @private
     * @param {LeaveTypePropertiesXmlDTO} policy
     * @param {moment.Moment} endDate
     * @returns {boolean}
     * @memberof LeaveApplicationValidationService
     */
    private validateApplyWithin(policy: LeaveTypePropertiesXmlDTO, endDate: moment.Moment): boolean {

        if (policy.applyWithinProperties.isAllowBackdated.isCheck) {
            return true;
        }

        const currentDate = moment(new Date(), 'YYYY-MM-DD').startOf('day');

        const dayDifference = this.dateCalculationService.getDayDuration([endDate, currentDate, policy.applyWithinProperties.excludeDayType.isExcludeHoliday, policy.applyWithinProperties.excludeDayType.isExcludeRestDay]);

        if (dayDifference <= policy.applyWithinProperties.numberOfDays) {
            return true;
        }

        return false;
    }

    /**
     * Method allowed day
     *
     * @private
     * @param {LeaveTypePropertiesXmlDTO} policy
     * @param {*} applyLeaveDTO
     * @returns {boolean}
     * @memberof LeaveApplicationValidationService
     */
    private allowedDay(policy: LeaveTypePropertiesXmlDTO, applyLeaveDTO: any): boolean {

        const maxAllowedDay = policy.maxDayPerLeave;

        const leaveDuration = this.dateCalculationService.getLeaveDuration([applyLeaveDTO.startDate, applyLeaveDTO.endDate, applyLeaveDTO.dayType, policy.excludeDayType.isExcludeHoliday, policy.excludeDayType.isExcludeRestDay]);

        if (leaveDuration <= maxAllowedDay) {
            return true;
        }

        return false;
    }

    // allow after confirmation or join date
    // based on current date leave applied
    /**
     * Method allow after confirm
     * allow after confirmation or join date
     * based on current date leave applied
     *
     * @private
     * @param {LeaveTypePropertiesXmlDTO} policy
     * @param {moment.Moment} confirmDate
     * @returns {boolean}
     * @memberof LeaveApplicationValidationService
     */
    private allowAfterConfirm(policy: LeaveTypePropertiesXmlDTO, confirmDate: moment.Moment): boolean {

        const currentDate = moment(new Date(), 'YYYY-MM-DD');

        // get the confirmation date
        if (!policy.isAllowAfterJoinDate && currentDate < confirmDate) {
            return false;
        }

        return true;
    }

    /**
     * Method convert date to moment
     *
     * @private
     * @param {Date} date
     * @returns
     * @memberof LeaveApplicationValidationService
     */
    private convertDateToMoment(date: Date) {
        return moment(date, 'YYYY-MM-DD');
    }

    // validate if other leave overlap with applied leave
    // except cancelled leave
    /**
     * Method validate overlap leave
     * validate if other leave overlap with applied leave
     * except cancelled leave
     *
     * @param {Date} startDate
     * @param {Date} endDate
     * @param {UserInfoModel} userInfo
     * @returns
     * @memberof LeaveApplicationValidationService
     */
    // public validateOverlapLeave(startDate: Date, endDate: Date, userInfo: UserInfoModel) {

    public validateOverlapLeave([startDate, endDate, userInfo, extrafilter]: [Date, Date, UserInfoModel, any]) {

        // const filter = ["((START_DATE <= " + startDate + ")AND(END_DATE >=" + startDate + ")OR(START_DATE <= " + endDate + ")AND(END_DATE>=" + endDate + "))AND(USER_GUID=" + userInfo.USER_GUID + ")"];

        const filter = ["((START_DATE <= " + startDate + ")AND(END_DATE >=" + startDate + ")OR(START_DATE <= " + endDate + ")AND(END_DATE>=" + endDate + "))AND(USER_GUID=" + userInfo.USER_GUID + ")AND(STATUS NOT IN ('CANCELLED','REJECTED'))"];

        // console.log(extrafilter.length);
        if (extrafilter.length > 0)
            filter.push(extrafilter);
        // console.log(filter);
        return this.leaveTransactionDbService.findByFilterV2([], filter)
            .pipe(map(res => {

                if (res.length > 0) {
                    return false;
                }

                return true;
            }))
    }
}