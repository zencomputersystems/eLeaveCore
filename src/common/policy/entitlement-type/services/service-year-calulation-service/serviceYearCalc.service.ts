import { IServiceYearCalc } from "../../interface/iServiceYearCalc";
import moment = require("moment");

export class ServiceYearCalc implements IServiceYearCalc {
    
    calculateEmployeeServiceYear(dateOfJoin: Date): number {
        
        let now = moment();

        let serviceYear = moment.duration(now.diff(dateOfJoin)).asYears()

        return Math.ceil(serviceYear);
        
    }

}