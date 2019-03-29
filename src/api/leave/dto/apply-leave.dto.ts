import { IsNotEmpty, IsISO8601, IsString, IsNumber } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

export class ApplyLeaveDTO {

    @IsNotEmpty()
    leaveTypeID: string;

    @IsNotEmpty()
    @IsISO8601()
    startDate: Date;

    @IsNotEmpty()
    @IsISO8601()
    endDate: Date;

    @IsNumber()
    @ApiModelProperty({
        description:'Type of Day, 0 = Full Day, 1 = Half Day, 2 = Quarter Day'
    })
    dayType: number;

    @IsString()
    reason: string;
}