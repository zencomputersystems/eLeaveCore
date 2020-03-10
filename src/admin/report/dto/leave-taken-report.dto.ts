import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';


/**
 * leave taken details dto
 *
 * @export
 * @class LeaveTakenDetailsDto
 */
export class LeaveTakenDetailsDto {
  /**
   * Leave type guid
   *
   * @type {string}
   * @memberof LeaveTakenDetailsDto
   */
  @ApiModelProperty({ description: 'Leave type id', example: 'HKBHBHBKJBJBJ' })
  @IsString()
  leaveTypeId: string;

  /**
   * Leavetype name
   *
   * @type {string}
   * @memberof LeaveTakenDetailsDto
   */
  @ApiModelProperty({ description: 'Leave type name', example: 'Annual Leave' })
  @IsString()
  leaveTypeName: string;

  /**
   * Start date
   *
   * @type {string}
   * @memberof LeaveTakenDetailsDto
   */
  @ApiModelProperty({ description: 'Start Date', example: '2020-01-05' })
  @IsString()
  startDate: string;

  /**
   * End date
   *
   * @type {string}
   * @memberof LeaveTakenDetailsDto
   */
  @ApiModelProperty({ description: 'End Date', example: '2020-01-08' })
  @IsNumber()
  endDate: string;

  /**
   * No of days
   *
   * @type {string}
   * @memberof LeaveTakenDetailsDto
   */
  @ApiModelProperty({ description: 'No. of Days', example: '2.5' })
  @IsString()
  noOfDays: string;

  /**
   * Approve by
   *
   * @type {string}
   * @memberof LeaveTakenDetailsDto
   */
  @ApiModelProperty({ description: 'Approve by', example: 'KN' })
  @IsString()
  approveBy: string;

  /**
   * Remarks
   *
   * @type {string}
   * @memberof LeaveTakenDetailsDto
   */
  @ApiModelProperty({ description: 'Remarks', example: 'Happy holiday to u' })
  @IsString()
  remarks: string;

}

/**
 * Leave taken reports dto
 *
 * @export
 * @class LeaveTakenReportDto
 */
export class LeaveTakenReportDto {
  /**
   * user guid
   *
   * @type {string}
   * @memberof LeaveTakenReportDto
   */
  @ApiModelProperty({ description: 'User guid', example: 'djasfbhirfvhbewirbgvhjwerh' })
  @IsString()
  userGuid: string;

  /**
   * Employee no
   *
   * @type {string}
   * @memberof LeaveTakenReportDto
   */
  @ApiModelProperty({ description: 'Employee No', example: '3037' })
  @IsString()
  employeeNo: string;

  /**
   * Employee name
   *
   * @type {string}
   * @memberof LeaveTakenReportDto
   */
  @ApiModelProperty({ description: 'Employee Name', example: 'Wan' })
  @IsString()
  employeeName: string;

  /**
   * Leave details
   *
   * @type {LeaveTakenDetailsDto[]}
   * @memberof LeaveTakenReportDto
   */
  @ApiModelProperty({ description: 'Leave detail', type: LeaveTakenDetailsDto })
  @IsNotEmpty()
  @Type(() => LeaveTakenDetailsDto)
  leaveDetail: LeaveTakenDetailsDto[];
}
