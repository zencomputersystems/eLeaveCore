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
    @ApiModelProperty()
    @IsNotEmpty()
    id: string;
}
