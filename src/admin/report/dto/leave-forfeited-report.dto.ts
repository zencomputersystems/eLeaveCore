import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * Leave forfeited report dto
 *
 * @export
 * @class LeaveForfeitedReportDto
 */
export class LeaveForfeitedReportDto {
  /**
   * User guid
   *
   * @type {string}
   * @memberof LeaveForfeitedReportDto
   */
  @ApiModelProperty({ description: 'User guid', example: 'djasfbhirfvhbewirbgvhjwerh' })
  @IsString()
  userGuid: string;

  /**
   * Employee no
   *
   * @type {string}
   * @memberof LeaveForfeitedReportDto
   */
  @ApiModelProperty({ description: 'Employee No', example: '3037' })
  @IsString()
  employeeNo: string;

  /**
   * Employee name
   *
   * @type {string}
   * @memberof LeaveForfeitedReportDto
   */
  @ApiModelProperty({ description: 'Employee Name', example: 'Wan' })
  @IsString()
  employeeName: string;

  /**
   * Leave type guid
   *
   * @type {string}
   * @memberof LeaveForfeitedReportDto
   */
  @ApiModelProperty({ description: 'Leave type id', example: 'HKBHBHBKJBJBJ' })
  @IsString()
  leaveTypeId: string;

  /**
   * Leave type name
   *
   * @type {string}
   * @memberof LeaveForfeitedReportDto
   */
  @ApiModelProperty({ description: 'Leave type name', example: 'Annual Leave' })
  @IsString()
  leaveTypeName: string;

  // @ApiModelProperty({ description: 'Start Date', example: '2020-01-05' })
  // @IsString()
  // startDate: string;

  // @ApiModelProperty({ description: 'End Date', example: '2020-01-08' })
  // @IsNumber()
  // endDate: string;

  /**
   * No of days
   *
   * @type {string}
   * @memberof LeaveForfeitedReportDto
   */
  @ApiModelProperty({ description: 'No. of Days', example: '2.5' })
  @IsString()
  noOfDays: string;

  // @ApiModelProperty({ description: 'Rejected by', example: 'KN' })
  // @IsString()
  // rejectBy: string;

  // @ApiModelProperty({ description: 'Remarks', example: 'Happy holiday to u' })
  // @IsString()
  // remarks: string;
}