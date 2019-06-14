import { IsNotEmpty } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

/**
 *
 *
 * @export
 * @class UserEmergencyContactDTO
 */
export class UserEmergencyContactDTO {
    @ApiModelProperty()
    @IsNotEmpty()
    contactName: string;

    @ApiModelProperty()
    @IsNotEmpty()
    contactNumber: string;
}