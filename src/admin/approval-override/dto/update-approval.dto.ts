import { ApiModelProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsString } from 'class-validator';

/**
 * Data needed to update approval override
 *
 * @export
 * @class UpdateApprovalDTO
 */
export class UpdateApprovalDTO {

  /**
   * leave transaction guid
   *
   * @type {string[]}
   * @memberof UpdateApprovalDTO
   */
  @ApiModelProperty({ description: 'Leave transaction guid', example: '["1b187cd0-82b2-11e9-80ee-51eec243a49b"]' })
  @IsArray()
  @IsNotEmpty()
  leaveTransactionId: string[];

  /**
   * Status to override
   *
   * @type {string}
   * @memberof UpdateApprovalDTO
   */
  @ApiModelProperty({ description: 'Status approval override', example: 'APPROVE' })
  @IsString()
  @IsNotEmpty()
  status: string;

  /**
   * Remark of approval override
   *
   * @type {string}
   * @memberof UpdateApprovalDTO
   */
  @ApiModelProperty({ description: 'Remark approval override', example: 'Hari raya leave' })
  @IsString()
  @IsNotEmpty()
  remark: string;
}