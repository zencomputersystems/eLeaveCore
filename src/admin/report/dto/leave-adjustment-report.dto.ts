import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LeaveAdjustmentReportDto {
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

  @ApiModelProperty({ description: 'Adjustment', example: '+2' })
  @IsString()
  adjustment: string;

  @ApiModelProperty({ description: 'Adjust by', example: 'Jessie' })
  @IsString()
  adjustBy: string;

  @ApiModelProperty({ description: 'Adjustment date', example: '2020-01-08' })
  @IsString()
  adjustDate: string;

  @ApiModelProperty({ description: 'Remarks', example: 'Bonus holiday to u' })
  @IsString()
  remarks: string;

}