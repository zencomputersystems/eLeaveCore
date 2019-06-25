import { ApiModelProperty } from '@nestjs/swagger';

/**
 * Data for leavetypeentitlement list
 *
 * @export
 * @class LeaveTypeEntitlementListDTO
 */
export class LeaveTypeEntitlementListDTO {
    /**
     * Data leavetype entitlement list - leavetype id
     *
     * @type {string}
     * @memberof LeaveTypeEntitlementListDTO
     */
    @ApiModelProperty()
    leaveTypeId: string;

    /**
     * Data leavetype entitlement list - leavetype
     *
     * @type {string}
     * @memberof LeaveTypeEntitlementListDTO
     */
    @ApiModelProperty()
    leaveType: string;

    /**
     * Data leavetype entitlement list - leave entitlement id
     *
     * @type {string}
     * @memberof LeaveTypeEntitlementListDTO
     */
    @ApiModelProperty()
    leaveEntitlementId: string;

    /**
     * Data leavetype entitlement list - leave entitlement code
     *
     * @type {string}
     * @memberof LeaveTypeEntitlementListDTO
     */
    @ApiModelProperty()
    leaveEntitlementCode: string;

    /**
     * Data leavetype entitlement list - leave entitlement description
     *
     * @type {string}
     * @memberof LeaveTypeEntitlementListDTO
     */
    @ApiModelProperty()
    leaveEntitlementDescription: string;
}