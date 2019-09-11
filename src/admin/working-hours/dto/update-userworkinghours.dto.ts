import { ApiModelProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

/**
 * Data object for update user working hours
 *
 * @export
 * @class UpdateUserWorkingHoursDTO
 */
export class UpdateUserWorkingHoursDTO {

  /**
   * User guid
   *
   * @type {string[]}
   * @memberof UpdateUserWorkingHoursDTO
   */
  @ApiModelProperty({ description: 'User guid for selected user', example: '["b022d1b1-ff12-9cdf-2272-8c01cb75fbe0"]' })
  @IsArray()
  @IsNotEmpty()
  user_guid: string[];

  /**
   * Working hours guid
   *
   * @type {string}
   * @memberof UpdateUserWorkingHoursDTO
   */
  @ApiModelProperty({ description: 'Working hours guid for selected user', example: '7eda5eb0-d39c-11e9-8edf-23055f06a6ea' })
  @IsString()
  @IsNotEmpty()
  working_hours_guid: string;
}