import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNumber } from 'class-validator';

/**
 * approval confirmation xml
 *
 * @class ApprovalConfirmationXML
 */
export class ApprovalConfirmationXML {
  /**
   * requirement
   *
   * @type {string}
   * @memberof ApprovalConfirmationXML
   */
  @ApiModelProperty({ description: 'requirement', example: 'Anyone, Everyone, Superior' })
  @IsString()
  requirement: string;

  /**
   * approvalLevel
   *
   * @type {number}
   * @memberof ApprovalConfirmationXML
   */
  @ApiModelProperty({ description: 'approvalLevel', example: 1 })
  @IsNumber()
  approvalLevel: number;

  /**
   * escalateAfterDays
   *
   * @type {number}
   * @memberof ApprovalConfirmationXML
   */
  @ApiModelProperty({ description: 'escalateAfterDays', example: 1 })
  @IsNumber()
  escalateAfterDays: number;
}