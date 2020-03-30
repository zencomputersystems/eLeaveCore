import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';
import { MainItemReportDto } from './main-item-report.dto';

/**
 * Apply on behalf report dto
 *
 * @export
 * @class ApplyOnBehalfReportDto
 */
export class ApplyOnBehalfReportDto extends MainItemReportDto {
  /**
   * User guid
   *
   * @type {string}
   * @memberof ApplyOnBehalfReportDto
   */
  @ApiModelProperty({ description: 'User guid', example: 'djkasbfkjbkqjbgh' })
  @IsString()
  userGuid: string;

  /**
   * Employee no
   *
   * @type {string}
   * @memberof ApplyOnBehalfReportDto
   */
  @ApiModelProperty({ description: 'Employee No', example: '3037' })
  @IsString()
  employeeNo: string;

  /**
   * Employee name
   *
   * @type {string}
   * @memberof ApplyOnBehalfReportDto
   */
  @ApiModelProperty({ description: 'Employee Name', example: 'Wan' })
  @IsString()
  employeeName: string;

  /**
   * Year service
   *
   * @type {number}
   * @memberof ApplyOnBehalfReportDto
   */
  @ApiModelProperty({ description: 'Year service', example: 1 })
  @IsNumber()
  yearService: number;

  /**
   * Leave type id
   *
   * @type {string}
   * @memberof ApplyOnBehalfReportDto
   */
  @ApiModelProperty({ description: 'Leave type id', example: 'HKBHBHBKJBJBJ' })
  @IsString()
  leaveTypeId: string;

  /**
   * Leave type name
   *
   * @type {string}
   * @memberof ApplyOnBehalfReportDto
   */
  @ApiModelProperty({ description: 'Leave type name', example: 'Annual Leave' })
  @IsString()
  leaveTypeName: string;

  /**
   * Application date
   *
   * @type {string}
   * @memberof ApplyOnBehalfReportDto
   */
  @ApiModelProperty({ description: 'Apply date', example: '2020-01-31' })
  @IsString()
  applicationDate: string;

  /**
   * Confirmed date
   *
   * @type {string}
   * @memberof ApplyOnBehalfReportDto
   */
  @ApiModelProperty({ description: 'Confirmed date', example: '2020-02-06' })
  @IsString()
  confirmedDate: string;

  /**
   * Applied by
   *
   * @type {string}
   * @memberof ApplyOnBehalfReportDto
   */
  @ApiModelProperty({ description: 'Applied by', example: 'Jessie' })
  @IsString()
  appliedBy: string;

  /**
   * Start date
   *
   * @type {string}
   * @memberof ApplyOnBehalfReportDto
   */
  @ApiModelProperty({ description: 'Start date', example: '2020-02-05' })
  @IsString()
  startDate: string;

  /**
   * Enda date
   *
   * @type {string}
   * @memberof ApplyOnBehalfReportDto
   */
  @ApiModelProperty({ description: 'End date', example: '2020-02-08' })
  @IsString()
  endDate: string;

  /**
   * No of days
   *
   * @type {string}
   * @memberof ApplyOnBehalfReportDto
   */
  @ApiModelProperty({ description: 'Number of days', example: '3.5' })
  @IsString()
  noOfDays: string;

  /**
   * Status
   *
   * @type {string}
   * @memberof ApplyOnBehalfReportDto
   */
  @ApiModelProperty({ description: 'Status override', example: 'Approve' })
  @IsString()
  status: string;

  /**
   * Day type
   *
   * @type {string}
   * @memberof ApplyOnBehalfReportDto
   */
  @ApiModelProperty({ description: 'Day type', example: 'q1' })
  @IsString()
  dayType: string;

  /**
   * Remarks
   *
   * @type {string}
   * @memberof ApplyOnBehalfReportDto
   */
  @ApiModelProperty({ description: 'Remarks', example: 'No access internet' })
  @IsString()
  remarks: string;

  /**
   * Link storage
   *
   * @type {string}
   * @memberof ApplyOnBehalfReportDto
   */
  @ApiModelProperty({ description: 'Link storage', example: 'Cloud storage' })
  @IsString()
  link: string;
}