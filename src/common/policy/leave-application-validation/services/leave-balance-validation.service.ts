import { Injectable } from "@nestjs/common";
import { ApplyLeaveDTO } from "src/api/leave/dto/apply-leave.dto";
import { UserLeaveEntitlementModel } from "src/api/userprofile/model/user-leave-entitlement.model";
import { DateCalculationService } from "src/common/calculation/service/date-calculation.service";
import { LeaveTypePropertiesXmlDTO } from "src/admin/leavetype-entitlement/dto/xml/leavetype-properties.xml.dto";
import { EntitledFullService } from "../../entitlement-type/services/leave-entitlement-type/entitledFull.service";
import { ProratedDateCurrentMonthService } from "../../entitlement-type/services/leave-entitlement-type/proratedDateCurrentMonth.service";
import { ProratedDateEndYearService } from "../../entitlement-type/services/leave-entitlement-type/proratedDateEndYear.service";
import { UserInfoModel } from "src/admin/user-info/model/user-info.model";
import { ServiceYearCalc } from "../../entitlement-type/services/service-year-calulation-service/serviceYearCalc.service";
import { XMLParserService } from "src/common/helper/xml-parser.service";
import moment = require("moment");

@Injectable()
export class LeaveBalanceValidationService {

    constructor(
        private readonly dateCalculationService: DateCalculationService,
        private readonly entitledInFullService: EntitledFullService,
        private readonly proratedDateMonthService: ProratedDateCurrentMonthService,
        private readonly proratedDateEndYearService: ProratedDateEndYearService,
        private readonly workingYearService: ServiceYearCalc,
        private readonly xmlParserService: XMLParserService) {}

    // validate if the balance is enough
    public validateLeaveBalance(userInfo: UserInfoModel, applyLeaveDTO: ApplyLeaveDTO,userEntitlement: UserLeaveEntitlementModel[]) {
        
        // get policy
        const parent = userEntitlement.filter(x=>x.PARENT_FLAG==1)[0];

        if(parent.PROPERTIES_XML==null||parent.PROPERTIES_XML==undefined) {
            throw "Policy Not Found";
        }

        const policy:LeaveTypePropertiesXmlDTO = this.xmlParserService.convertXMLToJson(parent.PROPERTIES_XML);

        // get leave duration
        const leaveDuration = this.dateCalculationService.getLeaveDuration(applyLeaveDTO.startDate,applyLeaveDTO.endDate,applyLeaveDTO.dayType,policy.excludeDayType.isExcludeHoliday,policy.excludeDayType.isExcludeRestDay);

        // calculate all available leave
        // for parent flag, we need to calculate based on policy
        // balance calculation will be based on entitlement type in policy
        // for child leave, we need to check the expiry date
        const parentBalance = this.getParentBalance(userInfo,policy);

        const childBalance = this.getChildBalance(applyLeaveDTO,userEntitlement,policy);
        

        const balance = ((parentBalance+childBalance) - leaveDuration);

        if(balance<0) {
            return false;
        } 

        return true;
    }

    public getParentBalance(userInfo: UserInfoModel, policy: LeaveTypePropertiesXmlDTO) {
        // PARENT CALCULATION
        let parentBalance = 0;

        const serviceYear = this.workingYearService.calculateEmployeeServiceYear(new Date(userInfo.JOIN_DATE));

        switch (policy.leaveEntitlementType.toUpperCase()) {
            case ("Entitled in full").toUpperCase():
                parentBalance = this.entitledInFullService.calculateEntitledLeave(new Date(userInfo.JOIN_DATE),serviceYear,policy);
                break;
            case ("Prorated from date-of-confirm to current month").toUpperCase():
                parentBalance = this.proratedDateMonthService.calculateEntitledLeave(new Date(userInfo.CONFIRMATION_DATE),serviceYear,policy);
                break;
            case ("Prorated from date-of-join to current month").toUpperCase():
                parentBalance = this.proratedDateMonthService.calculateEntitledLeave(new Date(userInfo.JOIN_DATE),serviceYear,policy);
                break;
            case ("Prorated from date-of-confirm to end of year").toUpperCase():
                parentBalance = this.proratedDateEndYearService.calculateEntitledLeave(new Date(userInfo.JOIN_DATE),serviceYear,policy);
                break;
            case ("Prorated from date-of-join to end of year").toUpperCase():
                parentBalance = this.proratedDateEndYearService.calculateEntitledLeave(new Date(userInfo.CONFIRMATION_DATE),serviceYear,policy);
                break;
            default:
                break;
        }

        return parentBalance;
    }

    public getChildBalance(applyLeaveDTO: ApplyLeaveDTO, userEntitlement: UserLeaveEntitlementModel[], policy: LeaveTypePropertiesXmlDTO) {
        
        const startDate = moment(applyLeaveDTO.startDate).startOf('days');
        const endDate = moment(applyLeaveDTO.endDate).endOf('days');

        // CHILD CALCULATION
        const childLeave = userEntitlement.filter(x=>x.PARENT_FLAG==0);

        let childLeaveCounter = 0;

        childLeave.forEach(element => {

            if(element.EXPIREDATE!=null) {
                let expiryDate = moment(element.EXPIREDATE,'YYYY-MM-DD').startOf('days');

                if(expiryDate.isSameOrBefore(endDate)&&expiryDate.isSameOrAfter(startDate)) {
                    // calculate the duration between start date and expiry date
                    let durationExpiredToStart = this.dateCalculationService.getLeaveDuration(applyLeaveDTO.startDate,element.EXPIREDATE,applyLeaveDTO.dayType,policy.excludeDayType.isExcludeHoliday,policy.excludeDayType.isExcludeRestDay);

                    childLeaveCounter += durationExpiredToStart>element.DAYS_ADDED?element.DAYS_ADDED:durationExpiredToStart;              
                }
            } else {
                childLeaveCounter += element.DAYS_ADDED;
            }
        });

        return childLeaveCounter;
    }

}