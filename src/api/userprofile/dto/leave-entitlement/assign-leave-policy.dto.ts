import { IsNotEmpty, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * Data for assign leave policy
 *
 * @export
 * @class AssignLeavePolicyDTO
 */
export class AssignLeavePolicyDTO {

    /**
     * Data assign leave policy - user id
     *
     * @type {string}
     * @memberof AssignLeavePolicyDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    userId: string;

    /**
     * Data assign leave policy - leavetype id
     *
     * @type {string}
     * @memberof AssignLeavePolicyDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    leaveTypeId: string;

    /**
     * Data assign leave policy - leave entitlement id
     *
     * @type {string}
     * @memberof AssignLeavePolicyDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    leaveEntitlementId: string;
}