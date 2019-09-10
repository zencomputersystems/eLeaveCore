import { WorkingHoursDTO } from './working-hours.dto';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateWorkingHoursDTO {

  @ApiModelProperty()
  @IsString()
  @IsNotEmpty()
  working_hours_guid: string;

  @ApiModelProperty({ type: WorkingHoursDTO })
  @IsNotEmpty()
  @Type(() => WorkingHoursDTO)
  data: WorkingHoursDTO;
}