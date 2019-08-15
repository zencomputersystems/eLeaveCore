import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { UserEducationDTO } from './user-education.dto';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * User education details DTO
 *
 * @export
 * @class UserEducationDetailDTO
 */
export class UserEducationDetailDTO {

    /**
     *Data user education detail - education detail
     *
     * @type {UserEducationDTO[]}
     * @memberof UserEducationDetailDTO
     */
    @ApiModelProperty({ type: [UserEducationDTO] })
    @Type(() => UserEducationDTO)
    @ValidateNested()
    educationDetail: UserEducationDTO[]
}