import { IsString, IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * Data for Start time and end time slot
 *
 * @export
 * @class StartEndTimeXMLDto
 */
export class StartEndTimeXMLDto {
  /**
   * Start time
   *
   * @type {string}
   * @memberof StartEndTimeXMLDto
   */
  @ApiModelProperty({
    description: 'Start time', example: '09:00'
  })
  @IsNotEmpty()
  @IsString()
  start_time: string;
  /**
   * End time
   *
   * @type {string}
   * @memberof StartEndTimeXMLDto
   */
  @ApiModelProperty({
    description: 'End time', example: '18:00'
  })
  @IsNotEmpty()
  @IsString()
  end_time: string;
}