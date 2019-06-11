import { UserEducationDTO } from './user-education.dto';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * User education details DTO
 *
 * @export
 * @class UserEducationDetailDTO
 */
export class UserEducationDetailDTO {

    @ApiModelProperty()
    @Type(() => UserEducationDTO)
    @ValidateNested()
    educationDetail: UserEducationDTO[]
}