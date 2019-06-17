import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

/**
 *
 *
 * @export
 * @class HolidayDataDTO
 */
export class HolidayDataDTO {
    @ApiModelProperty()
    @IsNotEmpty()
    readonly title: string;

    @ApiModelProperty()
    @IsNotEmpty()
    readonly start: string;

    @ApiModelProperty()
    @IsNotEmpty()
    readonly end: string;
}