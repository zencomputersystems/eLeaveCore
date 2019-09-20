import { ApiModelProperty } from '@nestjs/swagger';

/**
 * Data for birthday 
 *
 * @export
 * @class BirthdayDataDTO
 */
export class BirthdayDataDTO {
  /**
   * Date birthday
   *
   * @type {string}
   * @memberof BirthdayDataDTO
   */
  @ApiModelProperty({ description: 'Date birthday', example: '1992-01-01' })
  date: string;
  /**
   * Upcoming this year birthday
   *
   * @type {string}
   * @memberof BirthdayDataDTO
   */
  @ApiModelProperty({ description: 'Upcoming birthday', example: '2019-01-01' })
  upcoming: string;
  /**
   * Current age
   *
   * @type {number}
   * @memberof BirthdayDataDTO
   */
  @ApiModelProperty({ description: 'Current age', example: '27' })
  age: number;
  /**
   * Day date of birthday
   *
   * @type {string}
   * @memberof BirthdayDataDTO
   */
  @ApiModelProperty({ description: 'Day date of birthday', example: '01' })
  day: string;
  /**
   * Month date of birthday
   *
   * @type {string}
   * @memberof BirthdayDataDTO
   */
  @ApiModelProperty({ description: 'Month date of birthday', example: 'Jan' })
  month: string;
  /**
   * Remaining days to celebrate
   *
   * @type {string}
   * @memberof BirthdayDataDTO
   */
  @ApiModelProperty({ description: 'Remaining days to celebrate', example: '4 days to go' })
  remainingDays: string;
}