import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
import { MainItemReportDto } from './main-item-report.dto';

/**
 * Leave reject report dto
 *
 * @export
 * @class LeaveRejectReportDto
 */
export class LeaveRejectReportDto extends MainItemReportDto {
  /**
   * User guid
   *
   * @type {string}
   * @memberof LeaveRejectReportDto
   */
  @ApiModelProperty({ description: 'User guid', example: 'djasfbhirfvhbewirbgvhjwerh' })
  @IsString()
  userGuid: string;

  /**
   * Employee no
   *
   * @type {string}
   * @memberof LeaveRejectReportDto
   */
  @ApiModelProperty({ description: 'Employee No', example: '3037' })
  @IsString()
  employeeNo: string;

  /**
   * Employee name
   *
   * @type {string}
   * @memberof LeaveRejectReportDto
   */
  @ApiModelProperty({ description: 'Employee Name', example: 'Wan' })
  @IsString()
  employeeName: string;

  /**
   * Leavetype guid
   *
   * @type {string}
   * @memberof LeaveRejectReportDto
   */
  @ApiModelProperty({ description: 'Leave type id', example: 'HKBHBHBKJBJBJ' })
  @IsString()
  leaveTypeId: string;

  /**
   * Leave type name
   *
   * @type {string}
   * @memberof LeaveRejectReportDto
   */
  @ApiModelProperty({ description: 'Leave type name', example: 'Annual Leave' })
  @IsString()
  leaveTypeName: string;

  /**
   * Start date
   *
   * @type {string}
   * @memberof LeaveRejectReportDto
   */
  @ApiModelProperty({ description: 'Start Date', example: '2020-01-05' })
  @IsString()
  startDate: string;

  /**
   * End date
   *
   * @type {string}
   * @memberof LeaveRejectReportDto
   */
  @ApiModelProperty({ description: 'End Date', example: '2020-01-08' })
  @IsNumber()
  endDate: string;

  /**
   * No of days
   *
   * @type {string}
   * @memberof LeaveRejectReportDto
   */
  @ApiModelProperty({ description: 'No. of Days', example: '2.5' })
  @IsString()
  noOfDays: string;

  /**
   * Reject by
   *
   * @type {string}
   * @memberof LeaveRejectReportDto
   */
  @ApiModelProperty({ description: 'Rejected by', example: 'KN' })
  @IsString()
  rejectBy: string;

  /**
   * Leave remarks
   *
   * @type {string}
   * @memberof LeaveRejectReportDto
   */
  @ApiModelProperty({ description: 'Leave Remarks', example: 'Happy holiday to u' })
  @IsString()
  leaveRemarks: string;

  /**
   * Reject remarks
   *
   * @type {string}
   * @memberof LeaveRejectReportDto
   */
  @ApiModelProperty({ description: 'Reject Remarks', example: 'Happy holiday to u' })
  @IsString()
  rejectRemarks: string;

}

