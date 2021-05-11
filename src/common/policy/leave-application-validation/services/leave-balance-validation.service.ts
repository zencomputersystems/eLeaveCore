import { Injectable } from '@nestjs/common';
import { ApplyLeaveDTO } from 'src/api/leave/dto/apply-leave.dto';
import { UserLeaveEntitlementModel } from 'src/api/userprofile/model/user-leave-entitlement.model';
import { DateCalculationService } from 'src/common/calculation/service/date-calculation.service';
import { LeaveTypePropertiesXmlDTO } from 'src/admin/leavetype-entitlement/dto/xml/leavetype-properties.xml.dto';
import { EntitledFullService } from '../../entitlement-type/services/leave-entitlement-type/entitledFull.service';
import { ProratedDateCurrentMonthService } from '../../entitlement-type/services/leave-entitlement-type/proratedDateCurrentMonth.service';
import { ProratedDateEndYearService } from '../../entitlement-type/services/leave-entitlement-type/proratedDateEndYear.service';
import { UserInfoModel } from 'src/admin/user-info/model/user-info.model';
import { ServiceYearCalc } from '../../entitlement-type/services/service-year-calculation-service/serviceYearCalc.service';
import moment = require('moment');
import { LeaveTransactionDbService } from 'src/api/leave/db/leave-transaction.db.service';
import { map } from 'rxjs/operators';
import { LeaveTransactionModel } from 'src/api/leave/model/leave-transaction.model';
import { LeaveBalanceValidationParentService } from './leave-balance-validation-parent.service';
/** XMLparser from zen library  */
var { convertXMLToJson } = require('@zencloudservices/xmlparser');

/**
 * Service for leave balance validation
 *
 * @export
 * @class LeaveBalanceValidationService
 */
@Injectable()
export class LeaveBalanceValidationService {

    /**
     *Creates an instance of LeaveBalanceValidationService.
     * @param {DateCalculationService} dateCalculationService
     * @param {EntitledFullService} entitledInFullService
     * @param {ProratedDateCurrentMonthService} proratedDateMonthService
     * @param {ProratedDateEndYearService} proratedDateEndYearService
     * @param {ServiceYearCalc} workingYearService
     * @param {LeaveTransactionDbService} leaveTransactionDbService
     * @memberof LeaveBalanceValidationService
     */
    constructor(
        private readonly dateCalculationService: DateCalculationService,
        // private readonly entitledInFullService: EntitledFullService,
        // private readonly proratedDateMonthService: ProratedDateCurrentMonthService,
        // private readonly proratedDateEndYearService: ProratedDateEndYearService,
        // private readonly workingYearService: ServiceYearCalc,
        private readonly leaveTransactionDbService: LeaveTransactionDbService,
        private readonly leaveBalanceValidationParentService: LeaveBalanceValidationParentService) { }


    /**
     * Method validate leave balance
     * Validate if the balance is enough
     *
     * @param {UserInfoModel} userInfo
     * @param {ApplyLeaveDTO} applyLeaveDTO
     * @param {UserLeaveEntitlementModel[]} userEntitlement
     * @returns
     * @memberof LeaveBalanceValidationService
     */
    // public validateLeaveBalance(userInfo: UserInfoModel, applyLeaveDTO: ApplyLeaveDTO, userEntitlement: UserLeaveEntitlementModel[]) {

    public validateLeaveBalance([userInfo, applyLeaveDTO, userEntitlement]: [UserInfoModel, ApplyLeaveDTO, UserLeaveEntitlementModel[]]) {
        // get policy
        const parent = userEntitlement.filter(x => x.PARENT_FLAG == 1)[0];

        // initially set max and min as first element
        var max = userEntitlement[0].EXPIREDATE,
            min = userEntitlement[0].EXPIREDATE;

        // iterate over array values and update min & max
        userEntitlement.forEach(function (v) {
            max = new Date(v.EXPIREDATE) > new Date(max) ? v.EXPIREDATE : max;
            min = new Date(v.EXPIREDATE) < new Date(min) ? v.EXPIREDATE : min;
        });
        if (parent.PROPERTIES_XML == null || parent.PROPERTIES_XML == undefined) {
            throw 'Policy Not Found';
        }

        const policy: LeaveTypePropertiesXmlDTO = convertXMLToJson(parent.PROPERTIES_XML);

        // console.log(policy);
        // get leave applied duration
        // const leaveDuration = this.dateCalculationService.getLeaveDuration(applyLeaveDTO.startDate,applyLeaveDTO.endDate,applyLeaveDTO.dayType,policy.excludeDayType.isExcludeHoliday,policy.excludeDayType.isExcludeRestDay);

        let sumLeaveDuration = 0
        // for (let i = 0; i < applyLeaveDTO.data.length; i++) {
        //     let leaveDurationTemp = this.dateCalculationService.getLeaveDuration([applyLeaveDTO.data[i].startDate, applyLeaveDTO.data[i].endDate, applyLeaveDTO.data[i].dayType, policy.excludeDayType.isExcludeHoliday, policy.excludeDayType.isExcludeRestDay]);
        //     sumLeaveDuration = sumLeaveDuration + leaveDurationTemp;
        // }
        sumLeaveDuration = this.sumAllLeave(applyLeaveDTO, policy, sumLeaveDuration);

        const leaveDuration = sumLeaveDuration;



        // get all applied leave for this leave type
        const currentDateStartYear = new Date().getFullYear() + '-01-01';

        // ((START_DATE <=
        const filter = ['((START_DATE >= ' + currentDateStartYear + ')OR(END_DATE >=' + currentDateStartYear + ')AND(START_DATE <= ' + applyLeaveDTO.data[applyLeaveDTO.data.length - 1].endDate + ')OR(END_DATE>=' + applyLeaveDTO.data[applyLeaveDTO.data.length - 1].endDate + '))AND(USER_GUID = ' + userInfo.USER_GUID + ')AND(STATUS IN ("APPROVED","PENDING")'];
        // console.log(filter);
        return this.leaveTransactionDbService.findByFilterV2([], filter)
            .pipe(map((leaveTransactions: LeaveTransactionModel[]) => {

                // we need to check policy if current leave type rely on another leave
                // eg: medical leave and hospitalization leave
                //      Hospitalization leave balance is depending on medical leave usage
                //      hospitaliation leave calculation:
                //      Actual Entitlement = (( Available Hospitalization - Used Hospitalization) - Used Medical)
                let counterAppliedDay = 0;
                counterAppliedDay = this.getCounterAppliedDays([leaveTransactions, parent, counterAppliedDay, policy]);
                // leaveTransactions.forEach(element => {
                //     if (element.ACTIVE_FLAG && element.LEAVE_TYPE_GUID == parent.LEAVE_TYPE_GUID) {
                //         counterAppliedDay += element.NO_OF_DAYS;
                //         // console.log(counterAppliedDay);
                //     }
                //     // console.log(element.LEAVE_TYPE_GUID + ' - ' + policy.includeOtherLeaveType);
                //     if (policy.includeOtherLeaveType != null || policy.includeOtherLeaveType != '') {
                //         // add the applied day into calcuation
                //         // console.log(element.LEAVE_TYPE_GUID + ' - ' + policy.includeOtherLeaveType);
                //         if (element.ACTIVE_FLAG && element.LEAVE_TYPE_GUID == policy.includeOtherLeaveType) {
                //             // console.log(element.LEAVE_TYPE_GUID + ' = ' + element.NO_OF_DAYS);
                //             counterAppliedDay += element.NO_OF_DAYS;
                //             // console.log(counterAppliedDay);
                //         }
                //     }

                //     // console.log(counterAppliedDay);
                // });

                // calculate all available leave
                // for parent flag, we need to calculate based on policy
                // balance calculation will be based on entitlement type in policy
                // for child leave, we need to check the expiry date
                const parentBalance = this.leaveBalanceValidationParentService.getParentBalance(userInfo, policy);

                const childBalance = this.getChildBalance([applyLeaveDTO, userEntitlement, policy]);

                let balance = ((parentBalance + childBalance) - (leaveDuration + counterAppliedDay));
                // console.log(parentBalance + "-" + childBalance + "-" + leaveDuration + "-" + counterAppliedDay + " bal");
                // console.log(policy.isAllowAppliedMoreThanBalance.isCheck);
                // Check maximum expired date, if backdate then will set to 0
                if (applyLeaveDTO.leaveTypeID == '103c6c10-3452-11eb-aa42-6dcde99f6a5e') {
                    if (new Date() > new Date(max + ' 23:59:59')) {
                        balance = -1;
                    }
                }
                if (policy.isAllowAppliedMoreThanBalance.isCheck) {
                    return true;
                }
                if (balance < 0) {
                    return false;
                }

                return true;

            }))

    }
    /**
     * Refactor get counter applied days
     *
     * @param {*} [leaveTransactions, parent, counterAppliedDay, policy]
     * @returns
     * @memberof LeaveBalanceValidationService
     */
    public getCounterAppliedDays([leaveTransactions, parent, counterAppliedDay, policy]) {
        leaveTransactions.forEach(element => {

            if (element.ACTIVE_FLAG && element.LEAVE_TYPE_GUID == parent.LEAVE_TYPE_GUID) {
                counterAppliedDay += element.NO_OF_DAYS;
                // console.log(counterAppliedDay);
            }
            // console.log(element.LEAVE_TYPE_GUID + ' - ' + policy.includeOtherLeaveType);
            if (policy.includeOtherLeaveType != null || policy.includeOtherLeaveType != '') {
                // add the applied day into calcuation
                // console.log(element.LEAVE_TYPE_GUID + ' - ' + policy.includeOtherLeaveType);
                if (element.ACTIVE_FLAG && element.LEAVE_TYPE_GUID == policy.includeOtherLeaveType) {
                    // console.log(element.LEAVE_TYPE_GUID + ' = ' + element.NO_OF_DAYS);
                    counterAppliedDay += element.NO_OF_DAYS;
                    // console.log(counterAppliedDay);
                }
            }

            // console.log(counterAppliedDay);
        });
        return counterAppliedDay;
    }

    // /**
    //  * Method get parent balance
    //  *
    //  * @param {UserInfoModel} userInfo
    //  * @param {LeaveTypePropertiesXmlDTO} policy
    //  * @returns
    //  * @memberof LeaveBalanceValidationService
    //  */
    // public getParentBalance(userInfo: UserInfoModel, policy: LeaveTypePropertiesXmlDTO) {
    //     // PARENT CALCULATION
    //     let parentBalance = 0;

    //     const serviceYear = this.workingYearService.calculateEmployeeServiceYear(new Date(userInfo.JOIN_DATE));

    //     switch (policy.leaveEntitlementType.toUpperCase()) {
    //         case ('Entitled in full').toUpperCase():
    //             parentBalance = this.entitledInFullService.calculateEntitledLeave(new Date(userInfo.JOIN_DATE), serviceYear, policy);
    //             break;
    //         case ('Prorated from date-of-confirm to current month').toUpperCase():
    //             parentBalance = this.proratedDateMonthService.calculateEntitledLeave(new Date(userInfo.CONFIRMATION_DATE), serviceYear, policy);
    //             break;
    //         case ('Prorated from date-of-join to current month').toUpperCase():
    //             parentBalance = this.proratedDateMonthService.calculateEntitledLeave(new Date(userInfo.JOIN_DATE), serviceYear, policy);
    //             break;
    //         case ('Prorated from date-of-confirm to end of year').toUpperCase():
    //             parentBalance = this.proratedDateEndYearService.calculateEntitledLeave(new Date(userInfo.JOIN_DATE), serviceYear, policy);
    //             break;
    //         case ('Prorated from date-of-join to end of year').toUpperCase():
    //             parentBalance = this.proratedDateEndYearService.calculateEntitledLeave(new Date(userInfo.CONFIRMATION_DATE), serviceYear, policy);
    //             break;
    //         default:
    //             break;
    //     }

    //     return parentBalance;
    // }

    /**
     * Method get child balance
     *
     * @param {ApplyLeaveDTO} applyLeaveDTO
     * @param {UserLeaveEntitlementModel[]} userEntitlement
     * @param {LeaveTypePropertiesXmlDTO} policy
     * @returns
     * @memberof LeaveBalanceValidationService
     */
    // public getChildBalance(applyLeaveDTO: ApplyLeaveDTO, userEntitlement: UserLeaveEntitlementModel[], policy: LeaveTypePropertiesXmlDTO) {
    public getChildBalance([applyLeaveDTO, userEntitlement, policy]: [ApplyLeaveDTO, UserLeaveEntitlementModel[], LeaveTypePropertiesXmlDTO]) {

        const startDate = moment(applyLeaveDTO.data[0].startDate).startOf('days');
        const endDate = moment(applyLeaveDTO.data[applyLeaveDTO.data.length - 1].endDate).endOf('days');

        // CHILD CALCULATION
        const childLeave = userEntitlement.filter(x => x.PARENT_FLAG == 0);

        let childLeaveCounter = 0;

        childLeave.forEach(element => {

            if (element.EXPIREDATE != null) {
                // let expiryDate = moment(element.EXPIREDATE, 'YYYY-MM-DD').startOf('days');
                // // if (expiryDate.isSameOrBefore(endDate) && expiryDate.isSameOrAfter(startDate)) {
                // if (endDate.isSameOrBefore(expiryDate) && startDate.isSameOrBefore(expiryDate)) {
                //     console.log('one : ' + childLeaveCounter + '-' + element.DAYS_ADDED);
                //     // calculate the duration between start date and expiry date
                //     // let durationExpiredToStart = this.dateCalculationService.getLeaveDuration(applyLeaveDTO.startDate,element.EXPIREDATE,applyLeaveDTO.dayType,policy.excludeDayType.isExcludeHoliday,policy.excludeDayType.isExcludeRestDay);

                //     let sumLeaveDurTemp = 0
                //     // for (let i = 0; i < applyLeaveDTO.data.length; i++) {
                //     //     let leaveDurationTemp = this.dateCalculationService.getLeaveDuration([applyLeaveDTO.data[i].startDate, applyLeaveDTO.data[i].endDate, applyLeaveDTO.data[i].dayType, policy.excludeDayType.isExcludeHoliday, policy.excludeDayType.isExcludeRestDay]);
                //     //     sumLeaveDurTemp = sumLeaveDurTemp + leaveDurationTemp;
                //     // }
                //     sumLeaveDurTemp = this.sumAllLeave(applyLeaveDTO, policy, sumLeaveDurTemp);
                //     console.log(sumLeaveDurTemp);
                //     let durationExpiredToStart = sumLeaveDurTemp;


                //     childLeaveCounter += durationExpiredToStart > element.DAYS_ADDED ? element.DAYS_ADDED : durationExpiredToStart;
                // } else {
                //     console.log('two : ' + childLeaveCounter + '-' + element.DAYS_ADDED);
                //     childLeaveCounter += element.DAYS_ADDED;
                // }
                childLeaveCounter += element.DAYS_ADDED;
            } else {
                childLeaveCounter += element.DAYS_ADDED;
            }
        });

        return childLeaveCounter;
    }

    /**
     * Refactor sum all leave
     *
     * @param {*} applyLeaveDTO
     * @param {*} policy
     * @param {*} sumLeaveDurTemp
     * @returns
     * @memberof LeaveBalanceValidationService
     */
    public sumAllLeave(applyLeaveDTO, policy, sumLeaveDurTemp) {
        for (let i = 0; i < applyLeaveDTO.data.length; i++) {
            let leaveDurationTemp = this.dateCalculationService.getLeaveDuration([applyLeaveDTO.data[i].startDate, applyLeaveDTO.data[i].endDate, applyLeaveDTO.data[i].dayType, policy.excludeDayType.isExcludeHoliday, policy.excludeDayType.isExcludeRestDay]);
            sumLeaveDurTemp = sumLeaveDurTemp + leaveDurationTemp;
        }
        return sumLeaveDurTemp;
    }

}