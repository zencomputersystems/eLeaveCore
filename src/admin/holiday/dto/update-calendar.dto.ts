import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateCalendarDTO } from './create-calendar.dto';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { HolidayDataDTO } from './holiday-data.dto';
import { RestDataDTO } from './rest-data.dto';

/**
 * CreateCalendarDetailsDTO
 *
 * @export
 * @class CreateCalendarDetailsDTO
 */
export class CreateCalendarDetailsDTO {
    @ApiModelProperty({ description: 'Calendar profile code name', example: 'Selangor Calandar' })
    @IsNotEmpty()
    code: string;

    @ApiModelProperty({ type: [HolidayDataDTO], description: 'Holiday List' })
    @Type(() => HolidayDataDTO)
    @IsNotEmpty()
    holiday: HolidayDataDTO[];

    @ApiModelProperty({ type: [RestDataDTO], description: 'Rest day list' })
    @Type(() => RestDataDTO)
    @IsNotEmpty()
    rest: RestDataDTO[];
}

/**
 * Data to update calendar
 *
 * @export
 * @class UpdateCalendarDTO
 * @extends {CalendarDTO}
 */
export class UpdateCalendarDTO {
    /**
     * Data for update calendar - calendar guid
     *
     * @type {string}
     * @memberof UpdateCalendarDTO
     */
    @ApiModelProperty({ description: 'Calendar profile guid', example: '075f64d0-8cf1-11e9-805c-2f26cd7ad959' })
    @IsString()
    @IsNotEmpty()
    readonly calendar_guid: string;

    /**
     * Year of calendar
     *
     * @type {number}
     * @memberof UpdateCalendarDTO
     */
    @ApiModelProperty({ description: 'Year of calendar', example: 2019 })
    @IsNotEmpty()
    @IsNumber()
    readonly year: number;

    /**
     * Data for update calendar - data holiday json
     *
     * @type {CreateCalendarDetailsDTO}
     * @memberof UpdateCalendarDTO
     */
    @ApiModelProperty({ type: CreateCalendarDetailsDTO })
    @IsNotEmpty()
    @Type(() => CreateCalendarDetailsDTO)
    readonly data: CreateCalendarDetailsDTO;
}

