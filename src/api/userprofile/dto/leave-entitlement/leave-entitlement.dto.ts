import { ApiModelProperty } from '@nestjs/swagger';

/**
 * Data for leave entitlement
 *
 * @export
 * @class LeaveEntitlementDTO
 */
export class LeaveEntitlementDTO {

    /**
     *Creates an instance of LeaveEntitlementDTO.
     * @memberof LeaveEntitlementDTO
     */
    constructor() {
        this.leaveType = '';
        this.entitledDays = 0;
        this.leaveTaken = 0;
        this.leavePending = 0;
        this.leaveBalance = 0
    }

    /**
     * Data leave entitlement - leavetype
     *
     * @type {string}
     * @memberof LeaveEntitlementDTO
     */
    @ApiModelProperty()
    leaveType: string;

    /**
     * Data leave entitlement - entitled days
     *
     * @type {number}
     * @memberof LeaveEntitlementDTO
     */
    @ApiModelProperty()
    entitledDays: number;

    /**
     * Data leave entitlement - leave taken
     *
     * @type {number}
     * @memberof LeaveEntitlementDTO
     */
    @ApiModelProperty()
    leaveTaken: number;

    /**
     * Data leave entitlement - leave pending
     *
     * @type {number}
     * @memberof LeaveEntitlementDTO
     */
    @ApiModelProperty()
    leavePending: number;

    /**
     * Data leave entitlement - leave balance
     *
     * @type {number}
     * @memberof LeaveEntitlementDTO
     */
    @ApiModelProperty()
    leaveBalance: number;
}