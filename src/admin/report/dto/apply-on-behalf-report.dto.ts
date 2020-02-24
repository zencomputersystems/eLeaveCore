import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

export class ApplyOnBehalfReportDto {
  @ApiModelProperty({ description: 'User guid', example: 'djkasbfkjbkqjbgh' })
  @IsString()
  userGuid: string;

  @ApiModelProperty({ description: 'Employee No', example: '3037' })
  @IsString()
  employeeNo: string;

  @ApiModelProperty({ description: 'Employee Name', example: 'Wan' })
  @IsString()
  employeeName: string;

  @ApiModelProperty({ description: 'Year service', example: 1 })
  @IsNumber()
  yearService: number;

  @ApiModelProperty({ description: 'Leave type id', example: 'HKBHBHBKJBJBJ' })
  @IsString()
  leaveTypeId: string;

  @ApiModelProperty({ description: 'Leave type name', example: 'Annual Leave' })
  @IsString()
  leaveTypeName: string;

  @ApiModelProperty({ description: 'Apply date', example: '2020-01-31' })
  @IsString()
  applicationDate: string;

  @ApiModelProperty({ description: 'Confirmed date', example: '2020-02-06' })
  @IsString()
  confirmedDate: string;

  @ApiModelProperty({ description: 'Applied by', example: 'Jessie' })
  @IsString()
  appliedBy: string;

  @ApiModelProperty({ description: 'Start date', example: '2020-02-05' })
  @IsString()
  startDate: string;

  @ApiModelProperty({ description: 'End date', example: '2020-02-08' })
  @IsString()
  endDate: string;

  @ApiModelProperty({ description: 'Number of days', example: '3.5' })
  @IsString()
  noOfDays: string;

  @ApiModelProperty({ description: 'Status override', example: 'Approve' })
  @IsString()
  status: string;

  @ApiModelProperty({ description: 'Remarks', example: 'No access internet' })
  @IsString()
  remarks: string;
}