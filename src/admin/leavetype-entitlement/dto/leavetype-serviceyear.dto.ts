import { IsNotEmpty, IsNumber } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class LeaveTypeServiceYearDto {

    @ApiModelProperty()
    @IsNotEmpty()
    readonly id: string;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly min_year: number;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly max_year: number;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly entitled_days: number;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsNumber()
    readonly carry_forward: number;

}