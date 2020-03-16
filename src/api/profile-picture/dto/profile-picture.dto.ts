import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

/**
 * Profile picture data transfer object
 *
 * @export
 * @class ProfilePictureDto
 */
export class ProfilePictureDto {
  /**
   * User guid
   *
   * @type {string}
   * @memberof ProfilePictureDto
   */
  @ApiModelProperty({ description: 'user guid', example: '697b25ac-bff1-b1d1-f17e-fa0206fc7a2a' })
  @IsNotEmpty()
  @IsString()
  userGuid: string;

  /**
   * Profile picture file
   *
   * @type {string}
   * @memberof ProfilePictureDto
   */
  @ApiModelProperty({ description: 'profile picture file', example: '1577328758_ZENlogo1.png' })
  @IsNotEmpty()
  @IsString()
  profilePictureFile: string;
}