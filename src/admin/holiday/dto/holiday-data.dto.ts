import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsJSON } from "class-validator";
import { isObject } from "util";

/**
 *
 *
 * @export
 * @class HolidayDataDTO
 */
export class HolidayDataDTO {
    @ApiModelProperty()
    @IsNotEmpty()
    readonly title: string;

    @ApiModelProperty()
    @IsNotEmpty()
    readonly start: string; 

    @ApiModelProperty()
    @IsNotEmpty()
    readonly end : string; 
}