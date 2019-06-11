import { IServiceYearCalc } from '../../interface/iServiceYearCalc';
import moment = require('moment');

/**
 * Calculates service year.
 *
 * @export
 * @class ServiceYearCalc
 * @implements {IServiceYearCalc}
 */
export class ServiceYearCalc implements IServiceYearCalc {

    calculateEmployeeServiceYear(dateOfJoin: Date): number {

        let now = moment();

        let serviceYear = moment.duration(now.diff(dateOfJoin)).asYears();

        return Math.ceil(serviceYear);

    }

}
