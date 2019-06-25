import { ApiModelProperty } from '@nestjs/swagger';

/**
 * Data certification detail
 *
 * @export
 * @class CertificationDetailDTO
 */
export class CertificationDetailDTO {
    /**
     * Data dertification detail - certification name
     *
     * @type {string}
     * @memberof CertificationDetailDTO
     */
    @ApiModelProperty()
    certificationName: string;

    /**
     * Data dertification detail - certification enroll year
     *
     * @type {number}
     * @memberof CertificationDetailDTO
     */
    @ApiModelProperty()
    certificationEnrollYear: number;

    /**
     * Data dertification detail - certification graduation year
     *
     * @type {number}
     * @memberof CertificationDetailDTO
     */
    @ApiModelProperty()
    certificationGraduateYear: number;

    /**
     * Data dertification detail - certification attachment
     *
     * @type {string}
     * @memberof CertificationDetailDTO
     */
    @ApiModelProperty()
    certificationAttachment: string;
}