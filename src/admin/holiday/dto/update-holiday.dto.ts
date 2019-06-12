import { ApiModelProperty } from "@nestjs/swagger";

import { IsNotEmpty } from "class-validator";

export class UpdateHolidayDTO {
    @ApiModelProperty()
    @IsNotEmpty()
    readonly id: string;

    @ApiModelProperty()
    @IsNotEmpty()
    readonly data: string; 
}