import { ApiModelProperty } from "@nestjs/swagger";

import { IsNotEmpty } from "class-validator";

export class CalendarDTO {

    @ApiModelProperty({description:'Calendar profile code name',example:'profile 1, profile2, ...'})
    @IsNotEmpty()
    code: string;

    @ApiModelProperty({description:'Calendar profile guid',example:'075f64d0-8cf1-11e9-805c-2f26cd7ad959'})
    @IsNotEmpty()
    calendar_guid: string;
}