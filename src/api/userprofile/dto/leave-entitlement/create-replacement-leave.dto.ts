import { AssignLeavePolicyDTO } from './assign-leave-policy.dto';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';

/**
 * Data to create replacement leave
 *
 * @export
 * @class CreateReplacementLeaveDTO
 * @extends {AssignLeavePolicyDTO}
 */
export class CreateReplacementLeaveDTO extends AssignLeavePolicyDTO {
  /**
   * No of days to add to employee
   *
   * @type {number}
   * @memberof CreateReplacementLeaveDTO
   */
  @ApiModelProperty({ description: 'Number of replacement days need to be added', example: 2 })
  @IsNumber()
  @IsNotEmpty()
  noOfDays: number;
}