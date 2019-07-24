import { ApiModelProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

/**
 * Forfeit carry forward leave
 *
 * @class ForfeitCFLeave
 */
export class ForfeitCFLeave {
  /**
   * allow policy for forfeit carry forward
   *
   * @type {boolean}
   * @memberof ForfeitCFLeave
   */
  @ApiModelProperty({ description: 'allow policy for forfeit carry forward', example: true })
  @IsBoolean()
  value: boolean;

  /**
   * starting day of forfeit carry forward leave
   *
   * @type {number}
   * @memberof ForfeitCFLeave
   */
  @ApiModelProperty({ description: 'starting day of forfeit carry forward leave', example: 1 })
  @IsNumber()
  day: number;

  /**
   * starting month of forfeit carry forward leave
   *
   * @type {string}
   * @memberof ForfeitCFLeave
   */
  @ApiModelProperty({ description: 'starting month of forfeit carry forward leave', example: 'April' })
  @IsString()
  month: string;
}