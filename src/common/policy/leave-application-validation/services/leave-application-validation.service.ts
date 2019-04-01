import { Injectable } from "@nestjs/common";
import { LeaveTypePropertiesXmlDTO } from "src/admin/leavetype-entitlement/dto/xml/leavetype-properties.xml.dto";
import moment = require("moment");
import { ApplyLeaveDTO } from "src/api/leave/dto/apply-leave.dto";
import { ValidationStatusDTO } from "../dto/validation-status.dto";
import { UserInfoModel } from "src/admin/user-info/model/user-info.model";
import { DateCalculationService } from "src/common/calculation/service/date-calculation.service";
import { LeaveBalanceValidationService } from "./leave-balance-validation.service";
import { UserLeaveEntitlementModel } from "src/api/userprofile/model/user-leave-entitlement.model";
import { LeaveTransactionDbService } from "src/api/leave/db/leave-transaction.db.service";
import { map, mergeMap } from "rxjs/operators";

@Injectable()
export class LeaveApplicationValidationService {

    constructor(
        private readonly dateCalculationService: DateCalculationService,
        private readonly balanceValidationService: LeaveBalanceValidationService,
        private readonly leaveTransactionDbService: LeaveTransactionDbService) {}
    
    public validateLeave(
        policy: LeaveTypePropertiesXmlDTO,
        applyLeaveDTO: ApplyLeaveDTO,
        userInfo: UserInfoModel,
        userEntitlement: UserLeaveEntitlementModel[]) {

        const validationStatus = new ValidationStatusDTO();

        const startDate = this.convertDateToMoment(applyLeaveDTO.startDate);
        const endDate = this.convertDateToMoment(applyLeaveDTO.endDate);


        return this.validateOverlapLeave(applyLeaveDTO.startDate,applyLeaveDTO.endDate)
            .pipe(
                map((result: boolean) => {
                    if(!result) {
                        validationStatus.message.push("You have applied another leave between this date");
                    }
                }),
                mergeMap(res => {
    
                    return this.validateBalance(userInfo,applyLeaveDTO,userEntitlement)
                            .pipe(map((validateBalanceResult: boolean)=> {
                                if(!validateBalanceResult) {
                                    validationStatus.message.push("Leave balance not enough");
                                }

                                if(!this.allowAdvancedLeave(policy,startDate,endDate)) {
                                    validationStatus.message.push("Cannot apply advanced leave");
                                }
                        
                                if(!this.allowNextYearApplciation(policy,startDate,endDate)) {
                                    validationStatus.message.push("Cannot apply leave on the following year");
                                }
                        
                                if(!this.allowAfterConfirm(policy,this.convertDateToMoment(new Date(userInfo.CONFIRMATION_DATE)))) {
                                    validationStatus.message.push("Cannot apply before confirm");
                                }
                        
                                if(!this.validateApplyBefore(policy, startDate)) {
                                    validationStatus.message.push("You need to apply "+policy.applyBeforeProperties.numberOfDays+" Days before");
                                }
                        
                                // apply within will be overwited by apply before properties if available
                                if(policy.applyBeforeProperties.numberOfDays==0||policy.applyBeforeProperties.numberOfDays==null) {
                                    if(!this.validateApplyWithin(policy,endDate)) {
                                        validationStatus.message.push("You need to apply within "+policy.applyWithinProperties.numberOfDays+" days after leave end");
                                    }
                                }
                        
                                if(!this.allowedDay(policy,applyLeaveDTO)) {
                                    validationStatus.message.push("Leave duration exceed "+policy.maxDayPerLeave+" allowed days");
                                }
                        
                                if(validationStatus.message.length==0) {
                                    validationStatus.valid = true;
                                }
                
                                return validationStatus;
                            })
                        )
                        })  
            )         
    }

    private validateBalance(userInfo: UserInfoModel, applyLeaveDTO: ApplyLeaveDTO, userEntitlement: UserLeaveEntitlementModel[]) {
        const balance = this.balanceValidationService.validateLeaveBalance(userInfo,applyLeaveDTO,userEntitlement);

        return balance;
    }
    
    // check if employee can apply more than current date
    private allowAdvancedLeave(policy: LeaveTypePropertiesXmlDTO,startDate: moment.Moment, endDate: moment.Moment): boolean {

        const currentDate = moment(new Date(),'YYYY-MM-DD');
        
        if(policy.applyInAdvance||startDate<=currentDate && endDate<=currentDate) {
            return true;
        }

        return false;
    }

    // check if user can apply next year application
    // if allow advanced leave is false, this parameter by default is false
    private allowNextYearApplciation(policy: LeaveTypePropertiesXmlDTO, startDate: moment.Moment, endDate: moment.Moment): boolean {
        
        if(!policy.applyInAdvance) {
            policy.applyNextYear = false;
        }

        // next year 
        const nextYear = new Date().getFullYear()+1;
        
        if(policy.applyNextYear || (startDate.year()<=nextYear && endDate.year()<=nextYear)) {
            return true;
        }

        return false;
    }

    private validateAttachment(policy: LeaveTypePropertiesXmlDTO): boolean {
        return false;
    }

    // check if date applied if before the policy date
    // if short notice application is allowed, by default will return true
    private validateApplyBefore(policy: LeaveTypePropertiesXmlDTO, startDate: moment.Moment): boolean {

        if(policy.applyBeforeProperties.isAllowShortNotice.isCheck) {
            return true;
        }
        
        const currentDate = moment(new Date(),'YYYY-MM-DD').startOf('day');

        // find the date duration between start date and current date
        // check if rest day and holiday is included or not
        const dayDifference = this.dateCalculationService.getDayDuration(currentDate,startDate,policy.applyBeforeProperties.excludeDayType.isExcludeHoliday,policy.applyBeforeProperties.excludeDayType.isExcludeRestDay);

        if(dayDifference > policy.applyBeforeProperties.numberOfDays ) {
            return true;
        }

        return false;
    }

    // end date must be within the specified date after leave end otherwise consider as backdated if allowed
    private validateApplyWithin(policy: LeaveTypePropertiesXmlDTO, endDate: moment.Moment): boolean {
        
        if(policy.applyWithinProperties.isAllowBackdated.isCheck) {
            return true;
        }

        const currentDate = moment(new Date(),'YYYY-MM-DD').startOf('day');
        
        const dayDifference = this.dateCalculationService.getDayDuration(endDate,currentDate,policy.applyWithinProperties.excludeDayType.isExcludeHoliday,policy.applyWithinProperties.excludeDayType.isExcludeRestDay);

        if(dayDifference <= policy.applyWithinProperties.numberOfDays) {
            return true;
        }

        return false;
    }

    private allowedDay(policy: LeaveTypePropertiesXmlDTO,applyLeaveDTO: ApplyLeaveDTO): boolean {
        
        const maxAllowedDay = policy.maxDayPerLeave;

        const leaveDuration = this.dateCalculationService.getLeaveDuration(applyLeaveDTO.startDate,applyLeaveDTO.endDate,applyLeaveDTO.dayType,policy.excludeDayType.isExcludeHoliday,policy.excludeDayType.isExcludeRestDay);

        if(leaveDuration <= maxAllowedDay) {
            return true;
        }

        return false;
    }

    // allow after confirmation or join date
    // based on current date leave applied
    private allowAfterConfirm(policy: LeaveTypePropertiesXmlDTO, confirmDate: moment.Moment): boolean {

        const currentDate = moment(new Date(),'YYYY-MM-DD');
        
        // get the confirmation date
        if(!policy.isAllowAfterJoinDate && currentDate < confirmDate) {
            return false;
        }

        return true;
    }

    private convertDateToMoment(date: Date) {
        return moment(date,'YYYY-MM-DD');
    }

    // validate if other leave overlap with applied leave
    // except cancelled leave
    public validateOverlapLeave(startDate: Date, endDate: Date) {
        const filter = ["((START_DATE <= "+startDate+")AND(END_DATE >="+startDate+")OR(START_DATE <= "+endDate+")AND(END_DATE>="+endDate+"))"];

        return this.leaveTransactionDbService.findByFilterV2([],filter)
                .pipe(map(res => {
                    
                    if(res.length > 0) {
                        return false;
                    }
                    
                    return true;
                }))
    }
}