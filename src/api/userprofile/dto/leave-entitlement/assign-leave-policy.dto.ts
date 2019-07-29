import { IsNotEmpty, IsString, IsArray } from 'class-validator';
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
    @ApiModelProperty({
        description: 'Array of user guid', example: ["bb8b692b-aca9-3a47-180c-68a139d47a35",
            "a9653bdf-e42b-b4bd-2bb1-9224cd06646e"
        ]
    })
    @IsNotEmpty()
    @IsArray()
    userId: string[];

    /**
     * Data assign leave policy - leavetype id
     *
     * @type {string}
     * @memberof AssignLeavePolicyDTO
     */
    @ApiModelProperty({ description: 'Leave type guid', example: '85747738-66bf-8cb1-768a-d73319c61759' })
    @IsNotEmpty()
    @IsString()
    leaveTypeId: string;

    /**
     * Data assign leave policy - leave entitlement id
     *
     * @type {string}
     * @memberof AssignLeavePolicyDTO
     */
    @ApiModelProperty({ description: 'Leave entitlement guid', example: '79380630-54fb-11e9-aacc-f700d94a1817' })
    @IsNotEmpty()
    @IsString()
    leaveEntitlementId: string;
}