import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDate, IsDateString } from 'class-validator';

/**
 * Data for disable user
 *
 * @export
 * @class DisableUserDTO
 */
export class DisableUserDTO {
  /**
   * User guid
   *
   * @type {string}
   * @memberof DisableUserDTO
   */
  @ApiModelProperty({ description: 'User guid to update resign at', example: 'b022d1b1-ff12-9cdf-2272-8c01cb75fbe0' })
  @IsNotEmpty()
  @IsString()
  user_guid: string;
  /**
   * Resign date
   *
   * @type {Date}
   * @memberof DisableUserDTO
   */
  @ApiModelProperty({ description: 'Resign date', example: '2019-08-10' })
  @IsNotEmpty()
  resign_date: Date;
}