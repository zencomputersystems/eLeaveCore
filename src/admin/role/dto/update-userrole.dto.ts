import { ApiModelProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsString } from "class-validator";

/**
 * Data update user role
 *
 * @export
 * @class UpdateUserRoleDTO
 */
export class UpdateUserRoleDTO {
    /**
     * Data update user role - user_guid
     *
     * @type {string[]}
     * @memberof UpdateUserRoleDTO
     */
    @ApiModelProperty({ description: 'User guid for selected user', example: '["b022d1b1-ff12-9cdf-2272-8c01cb75fbe0"]' })
    @IsArray()
    @IsNotEmpty()
    user_guid: string[];

    /**
     * Data update user role - role_guid
     *
     * @type {string}
     * @memberof UpdateUserRoleDTO
     */
    @ApiModelProperty({ description: 'Role guid for selected user', example: '86bedde0-97d3-11e9-b12e-11cd8f889ff1' })
    @IsString()
    @IsNotEmpty()
    role_guid: string;
}