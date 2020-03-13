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
  @ApiModelProperty({ description: 'User guid requestor', example: '697b25ac-bff1-b1d1-f17e-fa0206fc7a2a' })
  @IsString()
  userGuid: string;

  /**
   * leavetype guid to request lerave
   *
   * @type {string}
   * @memberof EntitlementClaimRequestDto
   */
  @ApiModelProperty({ description: 'Leave type guid', example: 'aa84b3c0-7849-11e9-a449-bd6134fe73e4' })
  @IsString()
  leavetypeGuid: string;

  /**
   * Start date of leave available
   *
   * @type {string}
   * @memberof EntitlementClaimRequestDto
   */
  @ApiModelProperty({ description: 'Start date', example: '2019-08-28 05:45:24' })
  @IsString()
  startDate: string;

  /**
   * End date of leave available
   *
   * @type {string}
   * @memberof EntitlementClaimRequestDto
   */
  @ApiModelProperty({ description: 'End date', example: '2019-08-28 09:50:24' })
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

  /**
   * Attachment prove
   *
   * @type {string}
   * @memberof EntitlementClaimRequestDto
   */
  @ApiModelProperty({ description: 'Attachment', example: 'prove.jpg' })
  @IsString()
  attachment: string;
}