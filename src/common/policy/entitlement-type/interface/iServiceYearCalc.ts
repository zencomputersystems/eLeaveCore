/**
 * Interface Service year calculation
 *
 * @export
 * @interface IServiceYearCalc
 */
export interface IServiceYearCalc {

    // calculate service year
    // return back year of service
    /**
     * calculate service year
     * return back year of service
     *
     * @param {Date} dateOfJoin
     * @returns {number}
     * @memberof IServiceYearCalc
     */
    calculateEmployeeServiceYear(dateOfJoin: Date): number;

}