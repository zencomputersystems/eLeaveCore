import { IsBoolean, IsString, IsNotEmpty, ValidateIf } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

/**
 * general propertiesxmldto
 *
 * @export
 * @class GeneralPropertiesXmlDTO
 */
export class GeneralPropertiesXmlDTO {
    constructor() {
        this.isCheck = false;
    }

    @ApiModelProperty()
    @IsNotEmpty()
    @IsBoolean()
    isCheck: boolean;

    @ApiModelProperty()
    @ValidateIf(o => o.isCheck == true)
    @IsNotEmpty()
    @IsString()
    textValue: string;
}