import { ApiModelProperty } from '@nestjs/swagger';

/**
 *
 *
 * @export
 * @class CertificationDetailDTO
 */
export class CertificationDetailDTO {
    @ApiModelProperty()
    certificationName: string;

    @ApiModelProperty()
    certificationEnrollYear: number;

    @ApiModelProperty()
    certificationGraduateYear: number;

    @ApiModelProperty()
    certificationAttachment: string;
}