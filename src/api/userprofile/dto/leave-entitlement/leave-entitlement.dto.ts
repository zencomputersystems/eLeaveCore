import { ApiModelProperty } from '@nestjs/swagger';

/**
 *
 *
 * @export
 * @class LeaveEntitlementDTO
 */
export class LeaveEntitlementDTO {

    constructor() {
        this.leaveType = '';
        this.entitledDays = 0;
        this.leaveTaken = 0;
        this.leavePending = 0;
        this.leaveBalance = 0
    }

    @ApiModelProperty()
    leaveType: string;

    @ApiModelProperty()
    entitledDays: number;

    @ApiModelProperty()
    leaveTaken: number;

    @ApiModelProperty()
    leavePending: number;

    @ApiModelProperty()
    leaveBalance: number;
}