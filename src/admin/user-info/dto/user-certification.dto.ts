import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * User Certification DTO
 *
 * @export
 * @class UserCertificationDTO
 */
export class UserCertificationDTO {
    @ApiModelProperty()
    @IsNotEmpty()
    certificationName: string;

    @ApiModelProperty()
    @IsNotEmpty()
    certificationEnrollYear: number;

    @ApiModelProperty()
    @IsNotEmpty()
    certificationGraduateYear: number;

    @ApiModelProperty()
    @IsNotEmpty()
    certificationAttachment: string;
}
