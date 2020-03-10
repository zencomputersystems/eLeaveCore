import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * Leave cancel report dto
 *
 * @export
 * @class LeaveCancelReportDto
 */
export class LeaveCancelReportDto {
  /**
   * User guid
   *
   * @type {string}
   * @memberof LeaveCancelReportDto
   */
  @ApiModelProperty({ description: 'User guid', example: 'djasfbhirfvhbewirbgvhjwerh' })
  @IsString()
  userGuid: string;

  /**
   * Employee no
   *
   * @type {string}
   * @memberof LeaveCancelReportDto
   */
  @ApiModelProperty({ description: 'Employee No', example: '3037' })
  @IsString()
  employeeNo: string;

  /**
   * Employee name
   *
   * @type {string}
   * @memberof LeaveCancelReportDto
   */
  @ApiModelProperty({ description: 'Employee Name', example: 'Wan' })
  @IsString()
  employeeName: string;

  /**
   * Leavetype guid
   *
   * @type {string}
   * @memberof LeaveCancelReportDto
   */
  @ApiModelProperty({ description: 'Leave type id', example: 'HKBHBHBKJBJBJ' })
  @IsString()
  leaveTypeId: string;

  /**
   * Leavetype name
   *
   * @type {string}
   * @memberof LeaveCancelReportDto
   */
  @ApiModelProperty({ description: 'Leave type name', example: 'Annual Leave' })
  @IsString()
  leaveTypeName: string;

  /**
   * Start date
   *
   * @type {string}
   * @memberof LeaveCancelReportDto
   */
  @ApiModelProperty({ description: 'Start Date', example: '2020-01-05' })
  @IsString()
  startDate: string;

  /**
   * End date
   *
   * @type {string}
   * @memberof LeaveCancelReportDto
   */
  @ApiModelProperty({ description: 'End Date', example: '2020-01-08' })
  @IsString()
  endDate: string;

  /**
   * No of days
   *
   * @type {string}
   * @memberof LeaveCancelReportDto
   */
  @ApiModelProperty({ description: 'No. of Days', example: '2.5' })
  @IsString()
  noOfDays: string;

  /**
   * Cancel by
   *
   * @type {string}
   * @memberof LeaveCancelReportDto
   */
  @ApiModelProperty({ description: 'Cancel by', example: 'KN' })
  @IsString()
  cancelBy: string;

  /**
   * Leave remarks
   *
   * @type {string}
   * @memberof LeaveCancelReportDto
   */
  @ApiModelProperty({ description: 'Leave remarks', example: 'Happy holiday to u' })
  @IsString()
  leaveRemarks: string;

  /**
   * Cancal remarks
   *
   * @type {string}
   * @memberof LeaveCancelReportDto
   */
  @ApiModelProperty({ description: 'Cancel remarks', example: 'Get Medical leave' })
  @IsString()
  cancelRemarks: string;
}