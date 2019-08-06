import { ApplyLeaveDTO } from './apply-leave.dto';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';
/**
 * Data for apply leave by bundle
 *
 * @export
 * @class ApplyLeaveBundleDTO
 * @extends {ApplyController}
 */
export class ApplyLeaveBundleDTO {
  /**
   * Array of user guid
   *
   * @type {string[]}
   * @memberof ApplyLeaveBundleDTO
   */
  @ApiModelProperty({ description: 'Array of user guid', example: ["bb8b692b-aca9-3a47-180c-68a139d47a35", "a9653bdf-e42b-b4bd-2bb1-9224cd06646e"] })
  @IsArray()
  @IsNotEmpty()
  userId: string[];

  /**
   * Leave details
   *
   * @type {ApplyLeaveDTO}
   * @memberof ApplyLeaveBundleDTO
   */
  @ApiModelProperty({ description: 'Details of leave' })
  @IsNotEmpty()
  leaveDetails: ApplyLeaveDTO
}