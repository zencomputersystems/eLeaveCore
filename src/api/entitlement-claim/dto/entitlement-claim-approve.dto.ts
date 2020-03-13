import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * Entitlement claim approve data object
 *
 * @export
 * @class EntitlementClaimApproveDto
 */
export class EntitlementClaimApproveDto {
  /**
   * Entitlement claim guid
   *
   * @type {string}
   * @memberof EntitlementClaimApproveDto
   */
  @ApiModelProperty({ description: 'Entitlement claim guid', example: '5003f8a0-6445-11ea-aa9f-319f491ed5a7' })
  @IsString()
  entitlementClaimId: string;
  /**
   * Status entitlement claim
   *
   * @type {string}
   * @memberof EntitlementClaimApproveDto
   */
  @ApiModelProperty({ description: 'Entitlement claim status', example: 'APPROVED' })
  @IsString()
  status: string;
  /**
   * Final approval remarks entitlement claim
   *
   * @type {string}
   * @memberof EntitlementClaimApproveDto
   */
  @ApiModelProperty({ description: 'Final approval remarks', example: 'Prove approved' })
  @IsString()
  finalApprovalRemarks: string;
}