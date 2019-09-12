import { IsNotEmpty, IsString } from 'class-validator';
import { PersonalDetailXML } from './xml/personal-detail.xml';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * Data for update personal detail
 *
 * @export
 * @class UpdatePersonalDetailDTO
 * @extends {PersonalDetailXML}
 */
export class UpdatePersonalDetailDTO extends PersonalDetailXML {
    /**
     * Data update personal detail - id
     *
     * @type {string}
     * @memberof UpdatePersonalDetailDTO
     */
    @ApiModelProperty({ description: 'User info guid', example: '09c5011d-482c-4fc0-9624-42722d9eecad' })
    @IsNotEmpty()
    @IsString()
    id: string;

}