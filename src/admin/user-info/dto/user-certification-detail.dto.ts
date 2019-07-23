import { UserCertificationDTO } from './user-certification.dto';
import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * User certification detail DTO
 *
 * @export
 * @class UserCertificationDetailDTO
 */
export class UserCertificationDetailDTO {
    @ApiModelProperty()
    @Type(() => UserCertificationDTO)
    @ValidateNested()
    certificationDetail: UserCertificationDTO[]
}
