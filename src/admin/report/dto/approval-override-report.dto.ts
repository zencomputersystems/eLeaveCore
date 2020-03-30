import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { MainItemReportDto } from './main-item-report.dto';

/**
 * Approval override report dto
 *
 * @export
 * @class ApprovalOverrideReportDto
 */
export class ApprovalOverrideReportDto extends MainItemReportDto {
  /**
   * User guid
   *
   * @type {string}
   * @memberof ApprovalOverrideReportDto
   */
  @ApiModelProperty({ description: 'User guid', example: 'HJGHVKHGKHJBKHGJKNJKBHKDASKN' })
  @IsString()
  userGuid: string;

  /**
   * Employee no
   *
   * @type {string}
   * @memberof ApprovalOverrideReportDto
   */
  @ApiModelProperty({ description: 'Employee No', example: '3037' })
  @IsString()
  employeeNo: string;

  /**
   * Employee name
   *
   * @type {string}
   * @memberof ApprovalOverrideReportDto
   */
  @ApiModelProperty({ description: 'Employee Name', example: 'Wan' })
  @IsString()
  employeeName: string;

  /**
   * Leave type guid
   *
   * @type {string}
   * @memberof ApprovalOverrideReportDto
   */
  @ApiModelProperty({ description: 'Leave type id', example: 'HKBHBHBKJBJBJ' })
  @IsString()
  leaveTypeId: string;

  /**
   * Leave type name
   *
   * @type {string}
   * @memberof ApprovalOverrideReportDto
   */
  @ApiModelProperty({ description: 'Leave type name', example: 'Annual Leave' })
  @IsString()
  leaveTypeName: string;

  /**
   * Application date
   *
   * @type {string}
   * @memberof ApprovalOverrideReportDto
   */
  @ApiModelProperty({ description: 'Apply date', example: '2020-01-31' })
  @IsString()
  applicationDate: string;

  /**
   * Override by
   *
   * @type {string}
   * @memberof ApprovalOverrideReportDto
   */
  @ApiModelProperty({ description: 'Override by', example: 'Jessie' })
  @IsString()
  overrideBy: string;

  /**
   * Override date
   *
   * @type {string}
   * @memberof ApprovalOverrideReportDto
   */
  @ApiModelProperty({ description: 'Override date', example: '2020-02-02' })
  @IsString()
  overrideDate: string;

  /**
   * Start date
   *
   * @type {string}
   * @memberof ApprovalOverrideReportDto
   */
  @ApiModelProperty({ description: 'Start date', example: '2020-02-05' })
  @IsString()
  startDate: string;

  /**
   * End date
   *
   * @type {string}
   * @memberof ApprovalOverrideReportDto
   */
  @ApiModelProperty({ description: 'End date', example: '2020-02-08' })
  @IsString()
  endDate: string;

  /**
   * No of days
   *
   * @type {string}
   * @memberof ApprovalOverrideReportDto
   */
  @ApiModelProperty({ description: 'Number of days', example: '3.5' })
  @IsString()
  noOfDays: string;

  /**
   * Status
   *
   * @type {string}
   * @memberof ApprovalOverrideReportDto
   */
  @ApiModelProperty({ description: 'Status override', example: 'Approve' })
  @IsString()
  status: string;

  /**
   * Remarks
   *
   * @type {string}
   * @memberof ApprovalOverrideReportDto
   */
  @ApiModelProperty({ description: 'Remarks', example: 'Happy holiday' })
  @IsString()
  remarks: string;
}