import { ApiModelProperty } from '@nestjs/swagger';
import { IsBoolean, IsNumber, IsString } from 'class-validator';

/**
 * Allow year end closing
 *
 * @class AllowYearEndClosing
 */
export class AllowYearEndClosing {
  /**
   * allow year end closing policy
   *
   * @type {boolean}
   * @memberof AllowYearEndClosing
   */
  @ApiModelProperty({ description: 'allow year end closing policy', example: true })
  @IsBoolean()
  value: boolean;

  /**
   * starting day to allow setup year end closing
   *
   * @type {number}
   * @memberof AllowYearEndClosing
   */
  @ApiModelProperty({ description: 'starting day to allow setup year end closing', example: 1 })
  @IsNumber()
  day: number;

  /**
   * starting month to allow setup year end closing
   *
   * @type {string}
   * @memberof AllowYearEndClosing
   */
  @ApiModelProperty({ description: 'starting month to allow setup year end closing', example: 'November' })
  @IsString()
  month: string;

  /**
   * starting year to allow setup year end closing
   *
   * @type {string}
   * @memberof AllowYearEndClosing
   */
  @ApiModelProperty({ description: 'starting year to allow setup year end closing', example: 'This year/ Next year' })
  @IsString()
  relativeYear: string;
}