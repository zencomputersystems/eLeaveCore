import { ApiModelProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsJSON } from "class-validator";
import { isObject } from "util";
import { HolidayDataDTO } from "./holiday-data.dto";
import { RestDataDTO } from "./rest-data.dto";

export class CreateCalendarDTO {
    @ApiModelProperty()
    @IsNotEmpty()
    readonly holiday: HolidayDataDTO[];

    @ApiModelProperty()
    @IsNotEmpty()
    readonly rest: RestDataDTO[]; 
}