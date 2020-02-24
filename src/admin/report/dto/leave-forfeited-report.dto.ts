import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LeaveForfeitedReportDto {
  @ApiModelProperty({ description: 'User guid', example: 'djasfbhirfvhbewirbgvhjwerh' })
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

  // @ApiModelProperty({ description: 'Start Date', example: '2020-01-05' })
  // @IsString()
  // startDate: string;

  // @ApiModelProperty({ description: 'End Date', example: '2020-01-08' })
  // @IsNumber()
  // endDate: string;

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