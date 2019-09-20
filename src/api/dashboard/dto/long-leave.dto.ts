import { ApiModelProperty } from '@nestjs/swagger';

/**
 * Data long leave
 *
 * @export
 * @class LongLeaveDTO
 */
export class LongLeaveDTO {
  /**
   * Start date
   *
   * @type {string}
   * @memberof LongLeaveDTO
   */
  @ApiModelProperty({ description: 'Start date', example: '2019-09-23' })
  startDate: string;
  /**
   * End date
   *
   * @type {string}
   * @memberof LongLeaveDTO
   */
  @ApiModelProperty({ description: 'End date', example: '2019-09-30' })
  endDate: string;
  /**
   * Number of days
   *
   * @type {number}
   * @memberof LongLeaveDTO
   */
  @ApiModelProperty({ description: 'Number of days', example: 8 })
  noOfDays: number;
  /**
   * Days to go
   *
   * @type {string}
   * @memberof LongLeaveDTO
   */
  @ApiModelProperty({ description: 'Days remaining to long leave', example: '9 days remaining' })
  daysToGo: string;
}