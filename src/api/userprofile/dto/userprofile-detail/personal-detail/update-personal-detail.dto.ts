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
    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    id: string;

}