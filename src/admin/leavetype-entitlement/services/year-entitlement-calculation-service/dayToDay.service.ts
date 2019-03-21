import moment = require("moment");
import { IYearEntitleCalcService } from "../../interface/iYearEntitleCalc";

export class DayToDayService implements IYearEntitleCalcService {
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

        throw new Error("Method not implemented.");
    }
}