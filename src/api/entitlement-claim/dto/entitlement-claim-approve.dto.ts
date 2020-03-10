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
  @ApiModelProperty({ description: 'Entitlement claim guid', example: '5cc4ddb0-5dde-11ea-9a4d-5f2b8a8912ac' })
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