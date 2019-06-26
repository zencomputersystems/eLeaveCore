import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

/**
 * Data update user calendar to assign calendar 
 *
 * @export
 * @class UpdateUserCalendarDTO
 */
export class UpdateUserCalendarDTO {
    /**
     * Data for update user calendar - user guid 
     *
     * @type {string}
     * @memberof UpdateUserCalendarDTO
     */
    @ApiModelProperty({ description: 'User guid for selected user', example: 'b022d1b1-ff12-9cdf-2272-8c01cb75fbe0' })
    @IsArray()
    @IsNotEmpty()
    user_guid: string[];

    /**
     * Data for update user calendar - calendar guid to assign
     *
     * @type {string}
     * @memberof UpdateUserCalendarDTO
     */
    @ApiModelProperty({ description: 'Calendar guid for selected user', example: 'ddf22be0-8e59-11e9-979c-a39614dd33fc' })
    @IsString()
    @IsNotEmpty()
    calendar_guid: string;
}