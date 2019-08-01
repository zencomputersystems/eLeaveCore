import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsArray } from 'class-validator';

/**
 * Data for leave adjustment 
 *
 * @export
 * @class LeaveAdjustmentDTO
 */
export class LeaveAdjustmentDTO {
  /**
   * Leavetype id
   *
   * @type {string}
   * @memberof LeaveAdjustmentDTO
   */
  @ApiModelProperty({ description: 'Leave type guid', example: '85747738-66bf-8cb1-768a-d73319c61759' })
  @IsString()
  leaveTypeId: string;

  /**
   * No of days to add or remove
   *
   * @type {number}
   * @memberof LeaveAdjustmentDTO
   */
  @ApiModelProperty({ description: 'Number of days', example: '16' })
  @IsNumber()
  noOfDays: number;

  /**
   * User guid to adjust leave
   *
   * @type {string[]}
   * @memberof LeaveAdjustmentDTO
   */
  @ApiModelProperty({ description: 'Array of user guid', example: '["697b25ac-bff1-b1d1-f17e-fa0206fc7a2a","b022d1b1-ff12-9cdf-2272-8c01cb75fbe0"]' })
  @IsArray()
  userId: string[];

  /**
   * Reason for leave adjustment
   *
   * @type {string}
   * @memberof LeaveAdjustmentDTO
   */
  @ApiModelProperty({ description: 'Reason to adjust', example: 'Bonus Leave' })
  @IsString()
  reason: string;
}