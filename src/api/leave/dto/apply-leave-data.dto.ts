import { IsISO8601, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * Data for apply leave detail
 *
 * @export
 * @class ApplyLeaveDataDTO
 */
export class ApplyLeaveDataDTO {

    /**
     * Data apply leave - start date
     *
     * @type {Date}
     * @memberof ApplyLeaveDataDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    @IsISO8601()
    startDate: Date;

    /**
     * Data apply leave - end date
     *
     * @type {Date}
     * @memberof ApplyLeaveDataDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    @IsISO8601()
    endDate: Date;

    /**
     * Data apply leave - daytype (0 = Full Day, 1 = Half Day, 2 = Quarter Day)
     *
     * @type {number}
     * @memberof ApplyLeaveDataDTO
     */
    @IsNumber()
    @ApiModelProperty({
        description: 'Type of Day, 0 = Full Day, 1 = Half Day, 2 = Quarter Day'
    })
    dayType: number;

    /**
     * Data apply leave - slot (AM = Morning , PM = Afternoon)
     *
     * @type {string}
     * @memberof ApplyLeaveDataDTO
     */
    @IsString()
    @ApiModelProperty({
        description: 'Half of slot, AM = Morning , PM = Afternoon'
    })
    slot: string;

    /**
     * Data apply leave - quarterDay (Q1 = First , Q2 = Second, Q3 = Third, Q4 = Forth)
     *
     * @type {string}
     * @memberof ApplyLeaveDataDTO
     */
    @IsString()
    @ApiModelProperty({
        description: 'Type of Quarter, Q1 = First , Q2 = Second, Q3 = Third, Q4 = Forth'
    })
    quarterDay: string;

}