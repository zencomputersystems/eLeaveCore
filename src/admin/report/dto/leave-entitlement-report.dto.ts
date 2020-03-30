import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
import { MainItemReportDto } from './main-item-report.dto';


/**
 * Leave details dto
 *
 * @export
 * @class LeaveDetailsDto
 */
export class LeaveDetailsDto {
  /**
   * Leavetype guid
   *
   * @type {string}
   * @memberof LeaveDetailsDto
   */
  @ApiModelProperty({ description: 'Leave type id', example: 'HKBHBHBKJBJBJ' })
  @IsString()
  leaveTypeId: string;

  /**
   * Leavetype name
   *
   * @type {string}
   * @memberof LeaveDetailsDto
   */
  @ApiModelProperty({ description: 'Leave type name', example: 'Annual Leave' })
  @IsString()
  leaveTypeName: string;

  /**
   * Leavetype abbreviation
   *
   * @type {string}
   * @memberof LeaveDetailsDto
   */
  @ApiModelProperty({ description: 'Leave type abbr', example: 'AL' })
  @IsString()
  leaveTypeAbbr: string;

  /**
   * Entitled days
   *
   * @type {string}
   * @memberof LeaveDetailsDto
   */
  @ApiModelProperty({ description: 'Entitled days', example: '14.04' })
  @IsString()
  entitledDays: string;

  /**
   * Carried forward days
   *
   * @type {number}
   * @memberof LeaveDetailsDto
   */
  @ApiModelProperty({ description: 'Carried forward', example: 3 })
  @IsNumber()
  carriedForward: number;

  /**
   * Forfeited days
   *
   * @type {string}
   * @memberof LeaveDetailsDto
   */
  @ApiModelProperty({ description: 'Forfeited Days', example: '2.5' })
  @IsString()
  forfeited: string;

  /**
   * Taken days
   *
   * @type {string}
   * @memberof LeaveDetailsDto
   */
  @ApiModelProperty({ description: 'Taken Days', example: '3.5' })
  @IsString()
  taken: string;

  /**
   * Pending days
   *
   * @type {string}
   * @memberof LeaveDetailsDto
   */
  @ApiModelProperty({ description: 'Pending Days', example: '5.5' })
  @IsString()
  pending: string;

  /**
   * Balance days
   *
   * @type {string}
   * @memberof LeaveDetailsDto
   */
  @ApiModelProperty({ description: 'Balance Days', example: '9.5' })
  @IsString()
  balance: string;
}

/**
 * Leave entitlement report dto
 *
 * @export
 * @class LeaveEntitlementReportDto
 */
export class LeaveEntitlementReportDto extends MainItemReportDto {
  /**
   * User guid
   *
   * @type {string}
   * @memberof LeaveEntitlementReportDto
   */
  @ApiModelProperty({ description: 'User guid', example: 'djasfbhirfvhbewirbgvhjwerh' })
  @IsString()
  userGuid: string;

  /**
   * Employee no
   *
   * @type {string}
   * @memberof LeaveEntitlementReportDto
   */
  @ApiModelProperty({ description: 'Employee No', example: '3037' })
  @IsString()
  employeeNo: string;

  /**
   * Employee name
   *
   * @type {string}
   * @memberof LeaveEntitlementReportDto
   */
  @ApiModelProperty({ description: 'Employee Name', example: 'Wan' })
  @IsString()
  employeeName: string;

  /**
   * Designation
   *
   * @type {string}
   * @memberof LeaveEntitlementReportDto
   */
  @ApiModelProperty({ description: 'Designation', example: 'Solution developer' })
  @IsString()
  designation: string;

  /**
   * Year of service
   *
   * @type {number}
   * @memberof LeaveEntitlementReportDto
   */
  @ApiModelProperty({ description: 'Year of service', example: 1 })
  @IsString()
  yearService: number;

  /**
   * Leave abbreviation combined
   *
   * @type {string[]}
   * @memberof LeaveEntitlementReportDto
   */
  @ApiModelProperty({ description: 'Leave abbr', example: 'AL,ML,RL' })
  @IsString()
  abbr: string[];

  /**
   * Leave details one by one
   *
   * @type {LeaveDetailsDto[]}
   * @memberof LeaveEntitlementReportDto
   */
  @ApiModelProperty({ description: 'Leave detail', type: LeaveDetailsDto })
  @IsNotEmpty()
  @Type(() => LeaveDetailsDto)
  leaveDetail: LeaveDetailsDto[];
}
