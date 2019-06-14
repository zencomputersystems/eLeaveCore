import { IsNotEmpty } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

/**
 *
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