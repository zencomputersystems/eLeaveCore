import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class LeaveTypeServiceYearDto {

    @ApiModelProperty()
    @IsNotEmpty()
    readonly id: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly service_year_from: number;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly service_year_to: number;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly entitled_days: number;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly carry_forward: number;

}