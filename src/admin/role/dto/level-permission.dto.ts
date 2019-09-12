import { StatusPermissionDTO } from './status-permission.dto';
import { IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * Data level permission 
 *
 * @export
 * @class LevelPermissionDTO
 * @extends {StatusPermissionDTO}
 */
export class LevelPermissionDTO extends StatusPermissionDTO {
    /**
     * level permission
     *
     * @type {string}
     * @memberof LevelPermissionDTO
     */
    @ApiModelProperty({ description: 'Level access', example: 'All' })
    @IsString()
    level: string;
}