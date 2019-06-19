import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

/**
 *
 *
 * @export
 * @class UpdateUserCalendarDTO
 */
export class UpdateUserCalendarDTO {
    @ApiModelProperty({ description: 'User guid for selected user', example: 'b022d1b1-ff12-9cdf-2272-8c01cb75fbe0' })
    @IsString()
    @IsNotEmpty()
    user_guid: string;

    @ApiModelProperty({ description: 'Calendar guid for selected user', example: 'ddf22be0-8e59-11e9-979c-a39614dd33fc' })
    @IsString()
    @IsNotEmpty()
    calendar_guid: string;
}