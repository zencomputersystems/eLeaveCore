import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsJSON } from 'class-validator';
import { isObject } from 'util';
import { HolidayDataDTO } from './holiday-data.dto';
import { RestDataDTO } from './rest-data.dto';
import { Type } from 'class-transformer';
import { CalendarFilterDto } from './calendar-filter.dto';

/**
 * Data to create calendar
 *
 * @export
 * @class CreateCalendarDTO
 */
export class CreateCalendarDTO {

    /**
     * Data calendar code (calendar name)
     *
     * @type {string}
     * @memberof CreateCalendarDTO
     */
    @ApiModelProperty({ description: 'Calendar profile code name', example: 'Selangor Calandar' })
    @IsNotEmpty()
    code: string;

    /**
     * Filters from calendarific
     *
     * @type {string}
     * @memberof CreateCalendarDTO
     */
    @ApiModelProperty({ description: 'Filter details', type: CalendarFilterDto })
    @IsNotEmpty()
    @Type(() => CalendarFilterDto)
    filter: CalendarFilterDto;

    /**
     * Data calendar holiday day detail
     *
     * @type {HolidayDataDTO[]}
     * @memberof CreateCalendarDTO
     */
    @ApiModelProperty({ type: [HolidayDataDTO], description: 'Holiday List' })
    @Type(() => HolidayDataDTO)
    @IsNotEmpty()
    holiday: HolidayDataDTO[];

    /**
     * Data calendar rest day detail
     *
     * @type {RestDataDTO[]}
     * @memberof CreateCalendarDTO
     */
    @ApiModelProperty({ type: [RestDataDTO], description: 'Rest day list' })
    @Type(() => RestDataDTO)
    @IsNotEmpty()
    rest: RestDataDTO[];
}