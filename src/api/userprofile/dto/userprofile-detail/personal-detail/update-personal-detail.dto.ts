import { IsNotEmpty, IsString } from 'class-validator';
import { PersonalDetailXML } from './xml/personal-detail.xml';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 *
 *
 * @export
 * @class UpdatePersonalDetailDTO
 * @extends {PersonalDetailXML}
 */
export class UpdatePersonalDetailDTO extends PersonalDetailXML {
    @ApiModelProperty()
    @IsNotEmpty()
    @IsString()
    id: string;

}