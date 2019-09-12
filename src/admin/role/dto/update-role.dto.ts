import { RoleDTO } from './role.dto';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Data update role
 *
 * @export
 * @class UpdateRoleDTO
 */
export class UpdateRoleDTO {
    /**
     * Data update role - role_guid
     *
     * @type {string}
     * @memberof UpdateRoleDTO
     */
    @ApiModelProperty({ description: 'Role guid', example: '7ed41000-98aa-11e9-b9d9-0901b57c06f4' })
    @IsString()
    @IsNotEmpty()
    role_guid: string;

    /**
     * Data update role - data
     *
     * @type {RoleDTO}
     * @memberof UpdateRoleDTO
     */
    @ApiModelProperty({ description: 'Role details', type: RoleDTO })
    @IsNotEmpty()
    @Type(() => RoleDTO)
    data: RoleDTO;
}