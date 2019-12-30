import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Data reactivate user assign user profile
 *
 * @export
 * @class ReactivateUserDTO
 */
export class ReactivateUserDTO {
  /**
   * Rolw profile guid
   *
   * @type {string}
   * @memberof ReactivateUserDTO
   */
  @ApiModelProperty({ description: 'Role profile guid', example: '3d820240-207e-11ea-9251-93c64e03841d' })
  @IsNotEmpty()
  @IsString()
  roleProfileId: string;

  /**
   * Working hours guid
   *
   * @type {string}
   * @memberof ReactivateUserDTO
   */
  @ApiModelProperty({ description: 'Working hours guid', example: '9b1fb120-d46d-11e9-8654-573b14342361' })
  @IsNotEmpty()
  @IsString()
  workingHoursId: string;

  /**
   * Calendar guid
   *
   * @type {string}
   * @memberof ReactivateUserDTO
   */
  @ApiModelProperty({ description: 'Calendar profile guid', example: '0b8e2250-9721-11e9-bdd4-6dce2bf8cec4' })
  @IsNotEmpty()
  @IsString()
  calendarId: string;
}