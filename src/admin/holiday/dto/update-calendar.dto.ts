import { ApiModelProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateCalendarDTO } from './create-calendar.dto';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 *
 *
 * @export
 * @class UpdateCalendarDTO
 * @extends {CalendarDTO}
 */
export class UpdateCalendarDTO {
    @ApiModelProperty({ description: 'Calendar profile guid', example: '075f64d0-8cf1-11e9-805c-2f26cd7ad959' })
    @IsString()
    @IsNotEmpty()
    readonly calendar_guid: string;

    @ApiModelProperty({ type: CreateCalendarDTO })
    @IsNotEmpty()
    @Type(() => CreateCalendarDTO)
    readonly data: CreateCalendarDTO;
}