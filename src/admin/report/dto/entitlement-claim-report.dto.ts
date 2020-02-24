import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class EntitlementClaimReportDto {
  @ApiModelProperty({ description: 'User guid', example: '697b25ac-bff1-b1d1-f17e-fa0206fc7a2a' })
  @IsString()
  userGuid: string;

  @ApiModelProperty({ description: 'Employee No', example: '3037' })
  @IsString()
  employeeNo: string;

  @ApiModelProperty({ description: 'Employee Name', example: 'Wan' })
  @IsString()
  employeeName: string;

  @ApiModelProperty({ description: 'Leave type id', example: 'HKBHBHBKJBJBJ' })
  @IsString()
  leaveTypeId: string;

  @ApiModelProperty({ description: 'Leave type name', example: 'Annual Leave' })
  @IsString()
  leaveTypeName: string;

  @ApiModelProperty({ description: 'Application Date', example: '2020-01-05' })
  @IsString()
  applyDate: string;

  @ApiModelProperty({ description: 'Start Date', example: '2020-01-05' })
  @IsString()
  startDate: string;

  @ApiModelProperty({ description: 'End Date', example: '2020-01-08' })
  @IsString()
  endDate: string;

  @ApiModelProperty({ description: 'No. of Days', example: '2.5' })
  @IsString()
  noOfDays: string;

  @ApiModelProperty({ description: 'Status', example: 'PENDING' })
  @IsString()
  status: string;

  @ApiModelProperty({ description: 'Request Remarks', example: 'Happy holiday to u' })
  @IsString()
  requestRemarks: string;

  @ApiModelProperty({ description: 'Final Approve Remarks', example: 'Happy holiday to u' })
  @IsString()
  finalApproveRemarks: string;

}