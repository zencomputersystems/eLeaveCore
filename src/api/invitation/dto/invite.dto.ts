import { IsNotEmpty, IsString } from 'class-validator';
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
    @ApiModelProperty({ description: 'user id', example: '23dab410-6cc8-11ea-b3c7-0242ac170004' })
    @IsNotEmpty()
    @IsString()
    id: string; //user_GUID

}