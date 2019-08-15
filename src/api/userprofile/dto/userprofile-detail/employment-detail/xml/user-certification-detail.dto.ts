import { UserCertificationDTO } from './user-certification.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * Data user certification detail
 *
 * @export
 * @class UserCertificationDetailDTO
 */
export class UserCertificationDetailDTO {
    /**
     * Data user certification - certification detail
     *
     * @type {UserCertificationDTO[]}
     * @memberof UserCertificationDetailDTO
     */
    @ApiModelProperty({ type: [UserCertificationDTO] })
    @Type(() => UserCertificationDTO)
    @ValidateNested()
    certificationDetail: UserCertificationDTO[]
}