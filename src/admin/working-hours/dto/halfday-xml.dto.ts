import { StartEndTimeXMLDto } from './start-end-time-xml.dto';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Data object for half day xml details
 *
 * @export
 * @class HalfdayXMLDto
 */
export class HalfdayXMLDto {

  /**
   * Morning slot details
   *
   * @type {StartEndTimeXMLDto}
   * @memberof HalfdayXMLDto
   */
  @ApiModelProperty({
    description: 'First slot time for half day', type: StartEndTimeXMLDto
  })
  @IsNotEmpty()
  @Type(() => StartEndTimeXMLDto)
  AM: StartEndTimeXMLDto;

  /**
   * Afternoon slot details
   *
   * @type {StartEndTimeXMLDto}
   * @memberof HalfdayXMLDto
   */
  @ApiModelProperty({
    description: 'Second slot time for half day', type: StartEndTimeXMLDto
  })
  @IsNotEmpty()
  @Type(() => StartEndTimeXMLDto)
  PM: StartEndTimeXMLDto;
}