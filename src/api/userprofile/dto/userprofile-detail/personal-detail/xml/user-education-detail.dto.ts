import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { UserEducationDTO } from "./user-education.dto";
import { ApiModelProperty } from "@nestjs/swagger";

/**
 *
 *
 * @export
 * @class UserEducationDetailDTO
 */
export class UserEducationDetailDTO {

    @ApiModelProperty({ type: UserEducationDTO })
    @Type(() => UserEducationDTO)
    @ValidateNested()
    educationDetail: UserEducationDTO[]
}