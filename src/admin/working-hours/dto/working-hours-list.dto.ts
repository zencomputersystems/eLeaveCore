import { ApiModelProperty } from '@nestjs/swagger';

/**
 * Data object for working hour list
 *
 * @export
 * @class WorkingHoursListDTO
 */
export class WorkingHoursListDTO {

  /**
   * Code name for working hours profile
   *
   * @type {string}
   * @memberof WorkingHoursListDTO
   */
  @ApiModelProperty({ description: 'Code name for working hours profile', example: 'Manage 365' })
  code: string;

  /**
   * Working hours guid
   *
   * @type {string}
   * @memberof WorkingHoursListDTO
   */
  @ApiModelProperty({ description: 'Working hours guid', example: '460188f0-d39e-11e9-8edf-23055f06a6ea' })
  working_hours_guid: string;

  /**
   * Description
   *
   * @type {string}
   * @memberof WorkingHoursListDTO
   */
  @ApiModelProperty({ description: 'Description for working hours profile', example: 'Manage 365 standard working time' })
  description: string;
}