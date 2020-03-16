import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * Leave adjustment report dto
 *
 * @export
 * @class LeaveAdjustmentReportDto
 */
export class LeaveAdjustmentReportDto {
  /**
   * User guid
   *
   * @type {string}
   * @memberof LeaveAdjustmentReportDto
   */
  @ApiModelProperty({ description: 'User guid', example: '697b25ac-bff1-b1d1-f17e-fa0206fc7a2a' })
  @IsString()
  userGuid: string;

  /**
   * Employee no
   *
   * @type {string}
   * @memberof LeaveAdjustmentReportDto
   */
  @ApiModelProperty({ description: 'Employee No', example: '3037' })
  @IsString()
  employeeNo: string;

  /**
   * Employee name
   *
   * @type {string}
   * @memberof LeaveAdjustmentReportDto
   */
  @ApiModelProperty({ description: 'Employee Name', example: 'Wan' })
  @IsString()
  employeeName: string;

  /**
   * Company name
   *
   * @type {string}
   * @memberof LeaveAdjustmentReportDto
   */
  @ApiModelProperty({ description: 'Company Name', example: 'Zen Computer System Sdn. Bhd.' })
  @IsString()
  companyName: string;

  /**
   * Department name
   *
   * @type {string}
   * @memberof LeaveAdjustmentReportDto
   */
  @ApiModelProperty({ description: 'Department Name', example: 'Research and Development' })
  @IsString()
  departmentName: string;

  /**
   * Leavetype guid
   *
   * @type {string}
   * @memberof LeaveAdjustmentReportDto
   */
  @ApiModelProperty({ description: 'Leave type id', example: 'HKBHBHBKJBJBJ' })
  @IsString()
  leaveTypeId: string;

  /**
   * Leavetype name
   *
   * @type {string}
   * @memberof LeaveAdjustmentReportDto
   */
  @ApiModelProperty({ description: 'Leave type name', example: 'Annual Leave' })
  @IsString()
  leaveTypeName: string;

  /**
   * Leavetype Abbr
   *
   * @type {string}
   * @memberof LeaveAdjustmentReportDto
   */
  @ApiModelProperty({ description: 'Leave type Abbr', example: 'AL' })
  @IsString()
  leavetypeAbbr: string;

  /**
   * Adjustment
   *
   * @type {string}
   * @memberof LeaveAdjustmentReportDto
   */
  @ApiModelProperty({ description: 'Adjustment', example: '+2' })
  @IsString()
  adjustment: string;

  /**
   * Adjust by
   *
   * @type {string}
   * @memberof LeaveAdjustmentReportDto
   */
  @ApiModelProperty({ description: 'Adjust by', example: 'Jessie' })
  @IsString()
  adjustBy: string;

  /**
   * Adjust date
   *
   * @type {string}
   * @memberof LeaveAdjustmentReportDto
   */
  @ApiModelProperty({ description: 'Adjustment date', example: '2020-01-08' })
  @IsString()
  adjustDate: string;

  /**
   * Remarks
   *
   * @type {string}
   * @memberof LeaveAdjustmentReportDto
   */
  @ApiModelProperty({ description: 'Remarks', example: 'Bonus holiday to u' })
  @IsString()
  remarks: string;

}