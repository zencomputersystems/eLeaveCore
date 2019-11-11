import { ApiModelProperty } from '@nestjs/swagger';

/**
 * Data long leave
 *
 * @export
 * @class LongLeaveDTO
 */
export class LongLeaveDTO {
  /**
   * Leave type guid
   *
   * @type {string}
   * @memberof LongLeaveDTO
   */
  @ApiModelProperty({ description: 'Leave type guid', example: 'aa84b3c0-7849-11e9-a449-bd6134fe73e4' })
  leaveTypeGuid: string;
  /**
   * User guid
   *
   * @type {string}
   * @memberof LongLeaveDTO
   */
  @ApiModelProperty({ description: 'User guid', example: '697b25ac-bff1-b1d1-f17e-fa0206fc7a2a' })
  userGuid: string;

  /**
   * Fullname
   *
   * @type {string}
   * @memberof LongLeaveDTO
   */
  @ApiModelProperty({ description: 'Fullname', example: 'Ahmad Tarmimi (Test)' })
  fullname: string;

  /**
   * Designation
   *
   * @type {string}
   * @memberof LongLeaveDTO
   */
  @ApiModelProperty({ description: 'Designation', example: 'Service Desk Consultant' })
  designation: string;
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