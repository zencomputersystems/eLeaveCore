import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { WorkingHoursXMLDto } from './working-hours-xml.dto';
import { Type } from 'class-transformer';

/**
 * Data object for working hours
 *
 * @export
 * @class WorkingHoursDTO
 */
export class WorkingHoursDTO {

  /**
   * Code name for working hours
   *
   * @type {string}
   * @memberof WorkingHoursDTO
   */
  @ApiModelProperty({ description: 'Code name for working hours profile', example: 'Cyberjaya Branch normal time' })
  @IsString()
  code: string;

  /**
   * Description for working hours profile
   *
   * @type {string}
   * @memberof WorkingHoursDTO
   */
  @ApiModelProperty({ description: 'Description of working hours profile id', example: 'Normal time for branch cyberjaya' })
  @IsString()
  description: string;

  // @ApiModelProperty({ description: 'Properties working hours', type: WorkingHoursPropertiesDTO })
  // @IsNotEmpty()
  // @Type(() =>  WorkingHoursPropertiesDTO)
  // property:  WorkingHoursPropertiesDTO;

  /**
   * Properties xml for working hours details
   *
   * @type {string}
   * @memberof WorkingHoursDTO
   */
  @ApiModelProperty({
    description: 'Properties for working hours details', type: WorkingHoursXMLDto
  })
  @IsNotEmpty()
  @Type(() => WorkingHoursXMLDto)
  property: WorkingHoursXMLDto;
}