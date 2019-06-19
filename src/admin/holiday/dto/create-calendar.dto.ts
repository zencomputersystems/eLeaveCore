import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsJSON } from 'class-validator';
import { isObject } from 'util';
import { HolidayDataDTO } from './holiday-data.dto';
import { RestDataDTO } from './rest-data.dto';
import { Type } from 'class-transformer';

/**
 *
 *
 * @export
 * @class CreateCalendarDTO
 */
export class CreateCalendarDTO {

    /**
     *
     *
     * @type {string}
     * @memberof CreateCalendarDTO
     */
    @ApiModelProperty({ description: 'Calendar profile code name', example: 'profile 1, profile2, ...' })
    @IsNotEmpty()
    code: string;

    /**
     *
     *
     * @type {HolidayDataDTO[]}
     * @memberof CreateCalendarDTO
     */
    @ApiModelProperty({ type: HolidayDataDTO, description: 'Holiday List' })
    @Type(() => HolidayDataDTO)
    @IsNotEmpty()
    holiday: HolidayDataDTO[];

    /**
     *
     *
     * @type {RestDataDTO[]}
     * @memberof CreateCalendarDTO
     */
    @ApiModelProperty({ type: RestDataDTO, description: 'Rest day list' })
    @Type(() => RestDataDTO)
    @IsNotEmpty()
    rest: RestDataDTO[];
}