import moment = require("moment");
import { IYearEntitleCalcService } from "../../interface/iYearEntitleCalc";
import { YearEntitlementBaseService } from "./year-entitlement-base.service";
import { XMLParserService } from "src/common/helper/xml-parser.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DayToDayService extends YearEntitlementBaseService  implements IYearEntitleCalcService{

    constructor(
        private readonly xmlParserService: XMLParserService
    ) {
        super()
    }
    
    calculateYearlyEntitlement(dateOfJoin: Date, yearOfService: number ,leavePolicy: string): number {
        /* EG:
            
            Join Date = 23/March/2018
            Entitle for 1 year of service = 16

            April - Dec = 9 month
            31 March - 23 March = 9 Days

            Entitle Per Month = 16/12
            Entitle Per Day = Entitle Per Month/31 days 

            Total Entitle = (Entitle Per Month * 9 Month) + (Entitle Per Day * 9 Days)
        */


        let dateJoin = moment(dateOfJoin,this.dateFormat);

        // join month entitlement will be calculated based on days
        const monthJoin = dateJoin.month();


        // Convert xml to json
        const policyJson = this.xmlParserService.convertXMLToJson(leavePolicy);

        // month that will have full entitlement
        const monthFullEntitlement = (12 - monthJoin);

        const lastDayOfMonthJoin = dateJoin.daysInMonth();

        const joinMonthDayAmount = (lastDayOfMonthJoin+1)-dateJoin.day();

        const currentYearEntitlement = this.calculateEntitlement(yearOfService,policyJson,monthFullEntitlement,joinMonthDayAmount,lastDayOfMonthJoin,'DAY');
       
        if(yearOfService > 1) {
            // we need to read from 2 year of service data
            const previousServiceYear = yearOfService - 1;

            const previousYearEntitlement = this.calculateEntitlement(previousServiceYear,policyJson,(monthJoin-1),dateJoin.day(),lastDayOfMonthJoin,'DAY');
            
            return (currentYearEntitlement+previousYearEntitlement)
        } else {
            return currentYearEntitlement;
        }
   }

}