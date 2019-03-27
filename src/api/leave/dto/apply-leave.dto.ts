import { IsNotEmpty, IsISO8601, IsString } from "class-validator";

export class ApplyLeaveDTO {

    @IsNotEmpty()
    leaveTypeID: string;

    @IsNotEmpty()
    @IsISO8601()
    startDate: Date;

    @IsNotEmpty()
    @IsISO8601()
    endDate: Date;

    @IsString()
    halfDay: string;

    @IsString()
    reason: string;
}