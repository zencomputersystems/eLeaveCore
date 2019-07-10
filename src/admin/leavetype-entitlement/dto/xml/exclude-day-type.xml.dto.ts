import { ApiModelProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

/**
 * Data XML for Exclude day type 
 *
 * @export
 * @class ExcludeDayTypeXmlDTO
 */
export class ExcludeDayTypeXmlDTO {

    /**
     *Creates an instance of ExcludeDayTypeXmlDTO.
     * @memberof ExcludeDayTypeXmlDTO
     */
    constructor() {
        this.isExcludeHoliday = false;
        this.isExcludeRestDay = false;
    }

    /**
     * Exclude Holidays from calculation
     *
     * @type {boolean}
     * @memberof ExcludeDayTypeXmlDTO
     */
    @ApiModelProperty({ description: 'Exclude Holidays from calculation' })
    @IsBoolean()
    isExcludeHoliday: boolean;

    /**
     * Exclude Rest Days from calculation
     *
     * @type {boolean}
     * @memberof ExcludeDayTypeXmlDTO
     */
    @ApiModelProperty({ description: 'Exclude Rest Days from calculation' })
    @IsBoolean()
    isExcludeRestDay: boolean;

}