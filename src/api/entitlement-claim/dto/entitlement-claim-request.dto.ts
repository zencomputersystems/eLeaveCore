import { ApiModelProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * Entitlement claim request data object
 *
 * @export
 * @class EntitlementClaimRequestDto
 */
export class EntitlementClaimRequestDto {
  /**
   * User guid requestor
   *
   * @type {string}
   * @memberof EntitlementClaimRequestDto
   */
  @ApiModelProperty({ description: 'User guid requestor', example: 'HKJN' })
  @IsString()
  userGuid: string;

  /**
   * leavetype guid to request lerave
   *
   * @type {string}
   * @memberof EntitlementClaimRequestDto
   */
  @ApiModelProperty({ description: 'Leave type guid', example: 'HUKHJJHKJ' })
  @IsString()
  leavetypeGuid: string;

  /**
   * Start date of leave available
   *
   * @type {string}
   * @memberof EntitlementClaimRequestDto
   */
  @ApiModelProperty({ description: 'Start date', example: '2020-04-01' })
  @IsString()
  startDate: string;

  /**
   * End date of leave available
   *
   * @type {string}
   * @memberof EntitlementClaimRequestDto
   */
  @ApiModelProperty({ description: 'End date', example: '2020-05-01' })
  @IsString()
  endDate: string;

  /**
   * Number of days request
   *
   * @type {string}
   * @memberof EntitlementClaimRequestDto
   */
  @ApiModelProperty({ description: 'No. of days', example: '1.5' })
  @IsString()
  noOfDays: string;

  /**
   * Request remarks
   *
   * @type {string}
   * @memberof EntitlementClaimRequestDto
   */
  @ApiModelProperty({ description: 'Request remarks', example: 'Work ot last night' })
  @IsString()
  requestRemarks: string;
}