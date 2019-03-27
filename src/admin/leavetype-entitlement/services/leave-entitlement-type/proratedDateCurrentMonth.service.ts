import { LeaveEntitlementBaseService } from "./leave-entitlement-base.service";
import { ILeaveEntitlementType } from "../../interface/iLeaveEntitlementType";
import moment = require("moment");
import { XMLParserService } from "src/common/helper/xml-parser.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class ProratedDateCurrentMonthService extends LeaveEntitlementBaseService implements ILeaveEntitlementType {
    
    constructor(private readonly xmlParserService: XMLParserService) {
        super();
    }

    // calculate the leave entitlement
    // calculation based on date of join/date of confirm to current month
    // case:
    // Join date: 24/2/2019
    // current date: 1/4/2019
    // calculate Feb using day calculation
    // calculate March and April using Month Calculation
    calculateEntitledLeave(date: Date, yearOfService: number, leavePolicy: string): number {
        
        // convert date of join to moment type
        const dateMoment = moment(date,'YYYY-MM-DD');

        // join month entitlement will be calculated based on days
        const monthJoin = dateMoment.month()+1;

        const currentMonth = moment().month()+1;

        // Convert xml to json
        const policyJson = this.xmlParserService.convertXMLToJson(leavePolicy);

        const currentYearActualEntitlement = this.calculateEntitlement(dateMoment,policyJson,yearOfService,(currentMonth-monthJoin),"END");
        

        //console.log(currentYearActualEntitlement);
        if(yearOfService<=1) {
            return currentYearActualEntitlement;
        }


        const previousYearActualEntitlement = this.calculateEntitlement(dateMoment,policyJson,(yearOfService-1),(monthJoin-1),"START");

        return currentYearActualEntitlement+previousYearActualEntitlement;

        
    }

}