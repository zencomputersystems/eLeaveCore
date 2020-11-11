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

    /**
     * Method to calculate employee service year
     *
     * @param {Date} dateOfJoin
     * @returns {number}
     * @memberof ServiceYearCalc
     */
    calculateEmployeeServiceYear(dateOfJoin: Date): number {

        let now = moment();

        let serviceYear = moment.duration(now.diff(dateOfJoin)).asYears();
        // console.log(serviceYear);
        return serviceYear;
        // return Math.ceil(serviceYear);

    }

}
