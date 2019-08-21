import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Master setup data object
 *
 * @export
 * @class MasterSetupDTO
 */
export class MasterSetupDTO {
  /**
   * Old data to get changed
   *
   * @type {string}
   * @memberof MasterSetupDTO
   */
  @ApiModelProperty({ description: 'Data to change' })
  @IsNotEmpty()
  @IsString()
  oldName: string;

  /**
   * New data to replace old data
   *
   * @type {string}
   * @memberof MasterSetupDTO
   */
  @ApiModelProperty({ description: 'New data to replace old data' })
  @IsString()
  @IsString()
  newName: string;
}