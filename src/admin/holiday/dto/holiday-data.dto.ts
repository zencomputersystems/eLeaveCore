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
    readonly title: string;

    /**
     * Data holiday start date
     *
     * @type {string}
     * @memberof HolidayDataDTO
     */
    @ApiModelProperty({ description: 'Start date', example: '2019-09-09' })
    @IsNotEmpty()
    readonly start: string;

    /**
     * Data holiday end date
     *
     * @type {string}
     * @memberof HolidayDataDTO
     */
    @ApiModelProperty({ description: 'End date', example: '2019-09-09' })
    @IsNotEmpty()
    readonly end: string;
}