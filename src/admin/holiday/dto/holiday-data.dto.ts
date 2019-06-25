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
    @ApiModelProperty()
    @IsNotEmpty()
    readonly title: string;

    /**
     * Data holiday start date
     *
     * @type {string}
     * @memberof HolidayDataDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    readonly start: string;

    /**
     * Data holiday end date
     *
     * @type {string}
     * @memberof HolidayDataDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    readonly end: string;
}