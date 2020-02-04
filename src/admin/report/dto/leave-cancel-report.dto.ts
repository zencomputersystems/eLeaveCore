import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LeaveCancelReportDto {
  @ApiModelProperty({ description: 'User guid', example: 'djasfbhirfvhbewirbgvhjwerh' })
  @IsString()
  userGuid: string;

  @ApiModelProperty({ description: 'Employee No', example: '3037' })
  @IsString()
  employeeNo: string;

  @ApiModelProperty({ description: 'Employee Name', example: 'Wan' })
  @IsString()
  employeeName: string;

  @ApiModelProperty({ description: 'Leave type', example: 'Annual Leave' })
  @IsString()
  leaveType: string;

  @ApiModelProperty({ description: 'Start Date', example: '2020-01-05' })
  @IsString()
  startDate: string;

  @ApiModelProperty({ description: 'End Date', example: '2020-01-08' })
  @IsString()
  endDate: string;

  @ApiModelProperty({ description: 'No. of Days', example: '2.5' })
  @IsString()
  noOfDays: string;

  @ApiModelProperty({ description: 'Cancel by', example: 'KN' })
  @IsString()
  cancelBy: string;

  @ApiModelProperty({ description: 'Leave remarks', example: 'Happy holiday to u' })
  @IsString()
  leaveRemarks: string;

  @ApiModelProperty({ description: 'Cancel remarks', example: 'Get Medical leave' })
  @IsString()
  cancelRemarks: string;
}