import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateCalendarDTO } from './create-calendar.dto';
import { IsNotEmpty, IsString } from 'class-validator';

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
     * Data for update calendar - data holiday json
     *
     * @type {CreateCalendarDTO}
     * @memberof UpdateCalendarDTO
     */
    @ApiModelProperty({ type: CreateCalendarDTO })
    @IsNotEmpty()
    @Type(() => CreateCalendarDTO)
    readonly data: CreateCalendarDTO;
}