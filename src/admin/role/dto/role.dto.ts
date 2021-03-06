import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { RolePropertiesDTO } from './role-properties.dto';

/**
 * Data for role
 *
 * @export
 * @class RoleDTO
 */
export class RoleDTO {
    /**
     * Data role name
     *
     * @type {string}
     * @memberof RoleDTO
     */
    @ApiModelProperty({ description: 'Role code', example: 'Department Admin' })
    @IsString()
    code: string;

    /**
     * Data role description
     *
     * @type {string}
     * @memberof RoleDTO
     */
    @ApiModelProperty({ description: 'Description for role', example: 'Department Admin for all staff' })
    @IsString()
    description: string;

    /**
     * Data role properties
     *
     * @type {RolePropertiesDTO}
     * @memberof RoleDTO
     */
    @ApiModelProperty({ description: 'Properties role', type: RolePropertiesDTO })
    @IsNotEmpty()
    @Type(() => RolePropertiesDTO)
    property: RolePropertiesDTO;

}