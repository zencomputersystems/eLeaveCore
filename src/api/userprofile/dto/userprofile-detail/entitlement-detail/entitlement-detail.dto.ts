import { ApiModelProperty } from '@nestjs/swagger';

/**
 *
 *
 * @export
 * @class EntitlementDetailDTO
 */
export class EntitlementDetailDTO {
    @ApiModelProperty()
    leaveTypeId: string;

    @ApiModelProperty()
    leaveTypeName: string;

    @ApiModelProperty()
    entitledDays: number;

    @ApiModelProperty()
    takenDays: number;

    @ApiModelProperty()
    pendingDays: number;

    @ApiModelProperty()
    balanceDays: number;
}