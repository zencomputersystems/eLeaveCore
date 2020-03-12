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
  // @ApiModelProperty({ description: 'user guid', example: 'H8f7eg8g87GUHG' })
  // @IsNotEmpty()
  // @IsString()
  // userGuid: string;

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