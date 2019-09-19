import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

/**
 * Data for holiday 
 *
 * @export
 * @class HolidayDataDTO
 */
export class HolidayDataDTO {
    /**
     * Data holiday title name (Holiday name)
     *
     * @type {string}
     * @memberof HolidayDataDTO
     */
    @ApiModelProperty({ description: 'Title holiday', example: 'Hari Raya' })
    @IsNotEmpty()
    title: string;

    /**
     * Data holiday holiday name (provided by calendarific)
     *
     * @type {string}
     * @memberof HolidayDataDTO
     */
    @ApiModelProperty({ description: 'Default name provided by calendarific', example: 'Hari Raya Puasa' })
    @IsNotEmpty()
    holidayName: string;

    /**
     * Data holiday start date
     *
     * @type {string}
     * @memberof HolidayDataDTO
     */
    @ApiModelProperty({ description: 'Start date', example: '2019-09-09' })
    @IsNotEmpty()
    start: string;

    /**
     * Data holiday end date
     *
     * @type {string}
     * @memberof HolidayDataDTO
     */
    @ApiModelProperty({ description: 'End date', example: '2019-09-09' })
    @IsNotEmpty()
    end: string;
}