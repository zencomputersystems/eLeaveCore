import { LeaveTypeServiceYear } from './leavetype_serviceyear';

/**
 * Model for leave type properties
 *
 * @export
 * @class LeaveTypePropertiesModel
 */
export class LeaveTypePropertiesModel {
    /**
     * Leavetype properties model - apply in advance
     *
     * @memberof LeaveTypePropertiesModel
     */
    apply_in_advance = false;
    /**
     * Leavetype properties model - apply next year
     *
     * @memberof LeaveTypePropertiesModel
     */
    apply_next_year = false;
    /**
     * Leavetype properties model - claim entitlement
     *
     * @memberof LeaveTypePropertiesModel
     */
    claim_entitlement = false;
    /**
     * Leavetype properties model - apply halfday
     *
     * @memberof LeaveTypePropertiesModel
     */
    apply_halfday = false;
    /**
     * Leavetype properties model - attachment required
     *
     * @memberof LeaveTypePropertiesModel
     */
    attachment_required = false;
    /**
     * Leavetype properties model - apply before
     *
     * @type {*}
     * @memberof LeaveTypePropertiesModel
     */
    apply_before: any;
    /**
     * Leavetype properties model - apply more than balance
     *
     * @type {*}
     * @memberof LeaveTypePropertiesModel
     */
    apply_more_than_balance: any;
    /**
     * Leavetype properties model - allow cancel after start date
     *
     * @type {*}
     * @memberof LeaveTypePropertiesModel
     */
    allow_cancel_after_startdate: any;
    /**
     * Leavetype properties model - levels
     *
     * @memberof LeaveTypePropertiesModel
     */
    levels = new Array<LeaveTypeServiceYear>()

} 