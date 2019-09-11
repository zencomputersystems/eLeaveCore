import { WorkingHoursDTO } from './working-hours.dto';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Data object for update working hours
 *
 * @export
 * @class UpdateWorkingHoursDTO
 */
export class UpdateWorkingHoursDTO {

  /**
   * Working hours guid
   *
   * @type {string}
   * @memberof UpdateWorkingHoursDTO
   */
  @ApiModelProperty({ description: 'Working hours guid', example: '460188f0-d39e-11e9-8edf-23055f06a6ea' })
  @IsString()
  @IsNotEmpty()
  working_hours_guid: string;

  /**
   * Data working hours details
   *
   * @type {WorkingHoursDTO}
   * @memberof UpdateWorkingHoursDTO
   */
  @ApiModelProperty({ description: 'Working hours details', type: WorkingHoursDTO })
  @IsNotEmpty()
  @Type(() => WorkingHoursDTO)
  data: WorkingHoursDTO;
}