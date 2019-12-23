import { ApiModelProperty } from '@nestjs/swagger';

/**
 * Data entitlement detail
 *
 * @export
 * @class EntitlementDetailDTO
 */
export class EntitlementDetailDTO {
    /**
     * Data entitlement detail - leavetype id
     *
     * @type {string}
     * @memberof EntitlementDetailDTO
     */
    @ApiModelProperty()
    leaveTypeId: string;

    /**
     * Data entitlement detail - leavetype name 
     *
     * @type {string}
     * @memberof EntitlementDetailDTO
     */
    @ApiModelProperty()
    leaveTypeName: string;

    /**
     * Abbr
     *
     * @type {string}
     * @memberof EntitlementDetailDTO
     */
    @ApiModelProperty()
    abbr: string;


    /**
     * Data entitlement detail - entitled days
     *
     * @type {number}
     * @memberof EntitlementDetailDTO
     */
    @ApiModelProperty()
    entitledDays: number;

    /**
     * Data entitlement detail - taken days
     *
     * @type {number}
     * @memberof EntitlementDetailDTO
     */
    @ApiModelProperty()
    takenDays: number;

    /**
     * Data entitlement detail - pending days
     *
     * @type {number}
     * @memberof EntitlementDetailDTO
     */
    @ApiModelProperty()
    pendingDays: number;

    /**
     * Data entitlement detail - balance days
     *
     * @type {number}
     * @memberof EntitlementDetailDTO
     */
    @ApiModelProperty()
    balanceDays: number;
}