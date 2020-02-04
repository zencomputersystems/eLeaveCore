import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class ApprovalOverrideReportDto {
  @ApiModelProperty({ description: 'Employee No', example: '3037' })
  @IsString()
  employeeNo: string;

  @ApiModelProperty({ description: 'Employee Name', example: 'Wan' })
  @IsString()
  employeeName: string;

  @ApiModelProperty({ description: 'Leave type', example: 'Annual Leave' })
  @IsString()
  leaveType: string;

  @ApiModelProperty({ description: 'Apply date', example: '2020-01-31' })
  @IsString()
  applicationDate: string;

  @ApiModelProperty({ description: 'Override by', example: 'Jessie' })
  @IsString()
  overrideBy: string;

  @ApiModelProperty({ description: 'Override date', example: '2020-02-02' })
  @IsString()
  overrideDate: string;

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

  @ApiModelProperty({ description: 'Remarks', example: 'Happy holiday' })
  @IsString()
  remarks: string;
}