import { IsNotEmpty, IsNumber } from "class-validator";

export class LeaveTypeServiceYearDto {

    @IsNotEmpty()
    readonly id: string;

    @IsNotEmpty()
    @IsNumber()
    readonly min_year: number;

    @IsNotEmpty()
    @IsNumber()
    readonly max_year: number;

    @IsNotEmpty()
    @IsNumber()
    readonly entitled_days: number;

    @IsNotEmpty()
    @IsNumber()
    readonly carry_forward: number;

}