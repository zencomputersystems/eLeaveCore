import { ApiModelProperty } from '@nestjs/swagger';

/**
 *
 *
 * @export
 * @class LeaveTypeEntitlementListDTO
 */
export class LeaveTypeEntitlementListDTO {
    @ApiModelProperty()
    leaveTypeId: string;

    @ApiModelProperty()
    leaveType: string;

    @ApiModelProperty()
    leaveEntitlementId: string;

    @ApiModelProperty()
    leaveEntitlementCode: string;

    @ApiModelProperty()
    leaveEntitlementDescription: string;
}