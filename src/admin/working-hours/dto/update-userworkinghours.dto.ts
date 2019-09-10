import { ApiModelProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserWorkingHoursDTO {

  @ApiModelProperty({ description: 'User guid for selected user', example: '["b022d1b1-ff12-9cdf-2272-8c01cb75fbe0"]' })
  @IsArray()
  @IsNotEmpty()
  user_guid: string[];

  @ApiModelProperty({ description: 'Working hours guid for selected user', example: '86bedde0-97d3-11e9-b12e-11cd8f889ff1' })
  @IsString()
  @IsNotEmpty()
  working_hours_guid: string;
}