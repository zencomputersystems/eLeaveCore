import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsJSON } from "class-validator";
import { isObject } from "util";

export class HolidayDataDTO {
    @ApiModelProperty()
    @IsNotEmpty()
    readonly name: string;

    @ApiModelProperty()
    @IsNotEmpty()
    readonly date: string; 
}