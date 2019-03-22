import { IYearEntitleCalcService } from "../../interface/iYearEntitleCalc";
import moment = require("moment");
import { XMLParserService } from "src/common/helper/xml-parser.service";
import { YearEntitlementBaseService } from "./year-entitlement-base.service";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MonthToMonthService extends YearEntitlementBaseService implements IYearEntitleCalcService{

    constructor(
        private readonly xmlParserService: XMLParserService
    ) {
        super()
    }

    calculateYearlyEntitlement(dateOfJoin: Date, yearOfService: number,leavePolicy: string): number {
        /* EG:
            
            Join Date = 23/March/2018
            Entitle for 1 year of service = 16

            March - Dec = 10 month

            Entitle Per Month = 16/12
            
            Total Entitle = Entitle Per Month * 10 Month
        */

        let dateJoin = moment(dateOfJoin,this.dateFormat);

        const monthJoin = dateJoin.month();

        // Convert xml to json
        const policyJson = this.xmlParserService.convertXMLToJson(leavePolicy);

       
        // if month join is not 1, we need to calculate entitlement from current year of service and previous year of service
        if(monthJoin > 1) {

            const workingMonth = (12+1) - monthJoin;

            const actualCurrentYearEntitlement = this.calculateEntitlement(yearOfService,policyJson,workingMonth,0,0,'MONTH');

            // if year of service == 1, employee doesnt have previous year data
            if(yearOfService > 1) {

                //get previous year entitlement
                const actualPreviousYearEntitlement = this.calculateEntitlement(yearOfService,policyJson,(monthJoin-1),0,0,'MONTH');

                return actualCurrentYearEntitlement+actualPreviousYearEntitlement;
            

            } else {
                return actualCurrentYearEntitlement;
            }

        } else {
            return this.getEntitlementFromPolicy(policyJson,yearOfService);
        }
    }

}