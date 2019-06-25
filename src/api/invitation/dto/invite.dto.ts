import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * Data for invite dto
 *
 * @export
 * @class InviteDTO
 */
export class InviteDTO {
    /**
     * Data invite dto - id
     *
     * @type {string}
     * @memberof InviteDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    id: string; //user_GUID
}