import { StartEndTimeXMLDto } from './start-end-time-xml.dto';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Data for quarter day details
 *
 * @export
 * @class QuarterdayXMLDto
 */
export class QuarterdayXMLDto {
  /**
   * Quarter 1 time slot
   *
   * @type {StartEndTimeXMLDto}
   * @memberof QuarterdayXMLDto
   */
  @ApiModelProperty({
    description: 'First slot time for half day', type: StartEndTimeXMLDto
  })
  @IsNotEmpty()
  @Type(() => StartEndTimeXMLDto)
  Q1: StartEndTimeXMLDto;

  /**
   * Quarter 2 time slot
   *
   * @type {StartEndTimeXMLDto}
   * @memberof QuarterdayXMLDto
   */
  @ApiModelProperty({
    description: 'Second slot time for half day', type: StartEndTimeXMLDto
  })
  @IsNotEmpty()
  @Type(() => StartEndTimeXMLDto)
  Q2: StartEndTimeXMLDto;

  /**
   * Quarter 3 time slot
   *
   * @type {StartEndTimeXMLDto}
   * @memberof QuarterdayXMLDto
   */
  @ApiModelProperty({
    description: 'Third slot time for half day', type: StartEndTimeXMLDto
  })
  @IsNotEmpty()
  @Type(() => StartEndTimeXMLDto)
  Q3: StartEndTimeXMLDto;

  /**
   * Quarter 4 time slot
   *
   * @type {StartEndTimeXMLDto}
   * @memberof QuarterdayXMLDto
   */
  @ApiModelProperty({
    description: 'Forth slot time for half day', type: StartEndTimeXMLDto
  })
  @IsNotEmpty()
  @Type(() => StartEndTimeXMLDto)
  Q4: StartEndTimeXMLDto;
}