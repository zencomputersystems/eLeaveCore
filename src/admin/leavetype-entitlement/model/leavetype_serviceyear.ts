/**
 * Model for leavetype service year
 *
 * @export
 * @class LeaveTypeServiceYear
 */
export class LeaveTypeServiceYear {
    /**
     * Data leavetype service year - id
     *
     * @type {string}
     * @memberof LeaveTypeServiceYear
     */
    id: string;
    /**
     * Data leave type service year - year from
     *
     * @type {number}
     * @memberof LeaveTypeServiceYear
     */
    service_year_from: number;
    /**
     * Data leave type service year - year to
     *
     * @type {number}
     * @memberof LeaveTypeServiceYear
     */
    service_year_to: number;
    /**
     * Data leave type service year - entitled days
     *
     * @type {number}
     * @memberof LeaveTypeServiceYear
     */
    entitled_days: number;
    /**
     * Data leave type service year - carry forward
     *
     * @type {number}
     * @memberof LeaveTypeServiceYear
     */
    carry_forward: number;
}