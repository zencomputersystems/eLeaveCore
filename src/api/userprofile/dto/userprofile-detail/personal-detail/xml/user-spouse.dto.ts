import { IsNotEmpty } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

/**
 *
 *
 * @export
 * @class UserSpouseDTO
 */
export class UserSpouseDTO {
    @ApiModelProperty()
    @IsNotEmpty()
    spouseName: string;

    @ApiModelProperty()
    @IsNotEmpty()
    spouseIdentificationNumber: string;
}