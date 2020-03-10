import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * Entitlement claim report dto
 *
 * @export
 * @class EntitlementClaimReportDto
 */
export class EntitlementClaimReportDto {
  /**
   * User guid
   *
   * @type {string}
   * @memberof EntitlementClaimReportDto
   */
  @ApiModelProperty({ description: 'User guid', example: '697b25ac-bff1-b1d1-f17e-fa0206fc7a2a' })
  @IsString()
  userGuid: string;

  /**
   * Employee no
   *
   * @type {string}
   * @memberof EntitlementClaimReportDto
   */
  @ApiModelProperty({ description: 'Employee No', example: '3037' })
  @IsString()
  employeeNo: string;

  /**
   * Employee name
   *
   * @type {string}
   * @memberof EntitlementClaimReportDto
   */
  @ApiModelProperty({ description: 'Employee Name', example: 'Wan' })
  @IsString()
  employeeName: string;

  /**
   * Leave type guid
   *
   * @type {string}
   * @memberof EntitlementClaimReportDto
   */
  @ApiModelProperty({ description: 'Leave type id', example: 'HKBHBHBKJBJBJ' })
  @IsString()
  leaveTypeId: string;

  /**
   * Leave type name
   *
   * @type {string}
   * @memberof EntitlementClaimReportDto
   */
  @ApiModelProperty({ description: 'Leave type name', example: 'Annual Leave' })
  @IsString()
  leaveTypeName: string;

  /**
   * Apply date
   *
   * @type {string}
   * @memberof EntitlementClaimReportDto
   */
  @ApiModelProperty({ description: 'Application Date', example: '2020-01-05' })
  @IsString()
  applyDate: string;

  /**
   * Start date
   *
   * @type {string}
   * @memberof EntitlementClaimReportDto
   */
  @ApiModelProperty({ description: 'Start Date', example: '2020-01-05' })
  @IsString()
  startDate: string;

  /**
   * End date
   *
   * @type {string}
   * @memberof EntitlementClaimReportDto
   */
  @ApiModelProperty({ description: 'End Date', example: '2020-01-08' })
  @IsString()
  endDate: string;

  /**
   * No of days
   *
   * @type {string}
   * @memberof EntitlementClaimReportDto
   */
  @ApiModelProperty({ description: 'No. of Days', example: '2.5' })
  @IsString()
  noOfDays: string;

  /**
   * Status
   *
   * @type {string}
   * @memberof EntitlementClaimReportDto
   */
  @ApiModelProperty({ description: 'Status', example: 'PENDING' })
  @IsString()
  status: string;

  /**
   * Request remarks
   *
   * @type {string}
   * @memberof EntitlementClaimReportDto
   */
  @ApiModelProperty({ description: 'Request Remarks', example: 'Happy holiday to u' })
  @IsString()
  requestRemarks: string;

  /**
   * Final approval remarks
   *
   * @type {string}
   * @memberof EntitlementClaimReportDto
   */
  @ApiModelProperty({ description: 'Final Approve Remarks', example: 'Happy holiday to u' })
  @IsString()
  finalApproveRemarks: string;

}