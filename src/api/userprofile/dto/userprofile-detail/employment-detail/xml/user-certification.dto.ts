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
    @ApiModelProperty()
    @IsNotEmpty()
    certificationName: string;

    /**
     * Data user certification - certification enroll year
     *
     * @type {number}
     * @memberof UserCertificationDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    certificationEnrollYear: number;

    /**
     * Data user certification - certification graduate year
     *
     * @type {number}
     * @memberof UserCertificationDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    certificationGraduateYear: number;

    /**
     * Data user certification - certification attachment
     *
     * @type {string}
     * @memberof UserCertificationDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    certificationAttachment: string;
}