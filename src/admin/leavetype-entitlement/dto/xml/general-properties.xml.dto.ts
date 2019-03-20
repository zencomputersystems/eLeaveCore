import { IsBoolean, IsString, IsNotEmpty, ValidateIf } from "class-validator";

export class GeneralPropertiesXmlDTO {
    constructor() {
        this.isCheck = false;
    }

    @IsNotEmpty()
    @IsBoolean()
    isCheck: boolean;

    @ValidateIf(o => o.isCheck == true)
    @IsNotEmpty()
    @IsString()
    textValue: string;
}