import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * User certification dto
 *
 * @export
 * @class UserCertificationDTO
 */
export class UserCertificationDTO {
    /**
     * Data user certification - certification name
     *
     * @type {string}
     * @memberof UserCertificationDTO
     */
    @ApiModelProperty({ description: 'Certification name', example: 'Bachelor Degree In Computer Science' })
    @IsNotEmpty()
    certificationName: string;

    /**
     * Data user certification - certification enroll year
     *
     * @type {number}
     * @memberof UserCertificationDTO
     */
    @ApiModelProperty({ description: 'Certification enroll year', example: '2011' })
    @IsNotEmpty()
    certificationEnrollYear: number;

    /**
     * Data user certification - certification graduate year
     *
     * @type {number}
     * @memberof UserCertificationDTO
     */
    @ApiModelProperty({ description: 'Certification graduation year', example: '2015' })
    @IsNotEmpty()
    certificationGraduateYear: number;

    /**
     * Data user certification - certification attachment
     *
     * @type {string}
     * @memberof UserCertificationDTO
     */
    @ApiModelProperty({ description: 'Certification Attachment', example: 'attachment1.png' })
    @IsNotEmpty()
    certificationAttachment: string;
}