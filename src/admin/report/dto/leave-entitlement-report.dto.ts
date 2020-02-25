import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';


export class LeaveDetailsDto {
  @ApiModelProperty({ description: 'Leave type id', example: 'HKBHBHBKJBJBJ' })
  @IsString()
  leaveTypeId: string;

  @ApiModelProperty({ description: 'Leave type name', example: 'Annual Leave' })
  @IsString()
  leaveTypeName: string;

  @ApiModelProperty({ description: 'Leave type abbr', example: 'AL' })
  @IsString()
  leaveTypeAbbr: string;

  @ApiModelProperty({ description: 'Entitled days', example: '14.04' })
  @IsString()
  entitledDays: string;

  @ApiModelProperty({ description: 'Carried forward', example: 3 })
  @IsNumber()
  carriedForward: number;

  @ApiModelProperty({ description: 'Forfeited Days', example: '2.5' })
  @IsString()
  forfeited: string;

  @ApiModelProperty({ description: 'Taken Days', example: '3.5' })
  @IsString()
  taken: string;

  @ApiModelProperty({ description: 'Pending Days', example: '5.5' })
  @IsString()
  pending: string;

  @ApiModelProperty({ description: 'Balance Days', example: '9.5' })
  @IsString()
  balance: string;
}

export class LeaveEntitlementReportDto {
  @ApiModelProperty({ description: 'User guid', example: 'djasfbhirfvhbewirbgvhjwerh' })
  @IsString()
  userGuid: string;

  @ApiModelProperty({ description: 'Employee No', example: '3037' })
  @IsString()
  employeeNo: string;

  @ApiModelProperty({ description: 'Employee Name', example: 'Wan' })
  @IsString()
  employeeName: string;

  @ApiModelProperty({ description: 'Designation', example: 'Solution developer' })
  @IsString()
  designation: string;

  @ApiModelProperty({ description: 'Department', example: 'RND' })
  @IsString()
  department: string;

  @ApiModelProperty({ description: 'Company Name', example: 'Zen Computer System Sdn. Bhd.' })
  @IsString()
  companyName: string;

  @ApiModelProperty({ description: 'Year of service', example: 1 })
  @IsString()
  yearService: number;

  @ApiModelProperty({ description: 'Leave abbr', example: 'AL,ML,RL' })
  @IsString()
  abbr: string[];

  @ApiModelProperty({ description: 'Leave detail', type: LeaveDetailsDto })
  @IsNotEmpty()
  @Type(() => LeaveDetailsDto)
  leaveDetail: LeaveDetailsDto[];
}
