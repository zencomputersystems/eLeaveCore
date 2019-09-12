import { UserDto } from './user.dto';
import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * User Update DTO
 *
 * @export
 * @class UpdateUserDTO
 * @extends {UserDto}
 */
export class UpdateUserDTO extends UserDto {
    /**
     * Data update user - id
     *
     * @type {string}
     * @memberof UpdateUserDTO
     */
    @ApiModelProperty({ description: 'Employee user info guid', example: '09c5011d-482c-4fc0-9624-42722d9eecad' })
    @IsNotEmpty()
    id: string;
}
