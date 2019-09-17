import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

/**
 * Data for filter calendar
 *
 * @export
 * @class CalendarFilterDto
 */
export class CalendarFilterDto {

  /**
   * Filter Year
   *
   * @type {number}
   * @memberof CalendarFilterDto
   */
  @ApiModelProperty({ description: 'Calendarific filter - Year', example: 2019 })
  @IsNotEmpty()
  @IsNumber()
  year: number;

  /**
   * Filter Country
   *
   * @type {string}
   * @memberof CalendarFilterDto
   */
  @ApiModelProperty({ description: 'Calendarific filter - Country', example: "MY" })
  @IsNotEmpty()
  @IsString()
  country: string;

  /**
   * Filter Region
   *
   * @type {string}
   * @memberof CalendarFilterDto
   */
  @ApiModelProperty({ description: 'Calendarific filter - Region', example: "MY-10" })
  @IsNotEmpty()
  @IsString()
  region: string;
}