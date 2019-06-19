import { UserCertificationDTO } from './user-certification.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 *
 *
 * @export
 * @class UserCertificationDetailDTO
 */
export class UserCertificationDetailDTO {
    @ApiModelProperty({ type: UserCertificationDTO })
    @Type(() => UserCertificationDTO)
    @ValidateNested()
    certificationDetail: UserCertificationDTO[]
}