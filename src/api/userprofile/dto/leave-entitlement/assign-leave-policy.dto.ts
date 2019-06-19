import { IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 *
 *
 * @export
 * @class AssignLeavePolicyDTO
 */
export class AssignLeavePolicyDTO {

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    userId: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    leaveTypeId: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    leaveEntitlementId: string;
}