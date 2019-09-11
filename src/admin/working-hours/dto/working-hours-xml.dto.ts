import { StartEndTimeXMLDto } from './start-end-time-xml.dto';
import { HalfdayXMLDto } from './halfday-xml.dto';
import { QuarterdayXMLDto } from './quarterday-xml.dto';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Data for working hours details xml
 *
 * @export
 * @class WorkingHoursXMLDto
 */
export class WorkingHoursXMLDto {
  /**
   * Fullday properties details
   *
   * @type {StartEndTimeXMLDto}
   * @memberof WorkingHoursXMLDto
   */
  @ApiModelProperty({
    description: 'Fullday for working hours details', type: StartEndTimeXMLDto
  })
  @IsNotEmpty()
  @Type(() => StartEndTimeXMLDto)
  fullday: StartEndTimeXMLDto;

  /**
   * Halfday properties details
   *
   * @type {HalfdayXMLDto}
   * @memberof WorkingHoursXMLDto
   */
  @ApiModelProperty({
    description: 'Halfday for working hours details', type: HalfdayXMLDto
  })
  @IsNotEmpty()
  @Type(() => HalfdayXMLDto)
  halfday: HalfdayXMLDto;

  /**
   * Quarterday properties details
   *
   * @type {QuarterdayXMLDto}
   * @memberof WorkingHoursXMLDto
   */
  @ApiModelProperty({
    description: 'Quarterday for working hours details', type: QuarterdayXMLDto
  })
  @IsNotEmpty()
  @Type(() => QuarterdayXMLDto)
  quarterday: QuarterdayXMLDto;
}