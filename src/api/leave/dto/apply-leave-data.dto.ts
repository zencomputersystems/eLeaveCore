import { IsISO8601, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { ApiModelProperty } from "@nestjs/swagger";

/**
 *
 *
 * @export
 * @class ApplyLeaveDataDTO
 */
export class ApplyLeaveDataDTO {

    @ApiModelProperty()
    @IsNotEmpty()
    @IsISO8601()
    startDate: Date;

    @ApiModelProperty()
    @IsNotEmpty()
    @IsISO8601()
    endDate: Date;

    @IsNumber()
    @ApiModelProperty({
        description: 'Type of Day, 0 = Full Day, 1 = Half Day, 2 = Quarter Day'
    })
    dayType: number;

    @IsString()
    @ApiModelProperty({
        description: 'Half of slot, AM = Morning , PM = Afternoon'
    })
    slot: string;

    @IsString()
    @ApiModelProperty({
        description: 'Type of Quarter, Q1 = First , Q2 = Second, Q3 = Third, Q4 = Forth'
    })
    quarterDay: string;

}