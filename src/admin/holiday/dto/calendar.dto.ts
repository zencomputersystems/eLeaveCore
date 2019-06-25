import { ApiModelProperty } from '@nestjs/swagger';

import { IsNotEmpty } from 'class-validator';

/**
 * Data for calendar
 *
 * @export
 * @class CalendarDTO
 */
export class CalendarDTO {

    /**
     * Data calendar code (calendar name)
     *
     * @type {string}
     * @memberof CalendarDTO
     */
    @ApiModelProperty({ description: 'Calendar profile code name', example: 'profile 1, profile2, ...' })
    @IsNotEmpty()
    code: string;

    /**
     * Data calendar id
     *
     * @type {string}
     * @memberof CalendarDTO
     */
    @ApiModelProperty({ description: 'Calendar profile guid', example: '075f64d0-8cf1-11e9-805c-2f26cd7ad959' })
    @IsNotEmpty()
    calendar_guid: string;
}