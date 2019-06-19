import { ApiModelProperty } from '@nestjs/swagger';
import { IsBoolean } from 'class-validator';

/**
 *
 *
 * @export
 * @class ExcludeDayTypeXmlDTO
 */
export class ExcludeDayTypeXmlDTO {

    constructor() {
        this.isExcludeHoliday = false;
        this.isExcludeRestDay = false;
    }

    @ApiModelProperty({ description: 'Exclude Holidays from calculation' })
    @IsBoolean()
    isExcludeHoliday: boolean;

    @ApiModelProperty({ description: 'Exclude Rest Days from calculation' })
    @IsBoolean()
    isExcludeRestDay: boolean;

}