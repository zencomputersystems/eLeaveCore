import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

/**
 * Change password dto
 *
 * @export
 * @class ChangePasswordDto
 */
export class ChangePasswordDto {
  /**
   * Login id
   *
   * @type {string}
   * @memberof ChangePasswordDto
   */
  @ApiModelProperty({ description: 'login id', example: 'usadnenwfklan' })
  @IsString()
  @IsNotEmpty()
  loginId: string;

  /**
   * Password
   *
   * @type {string}
   * @memberof ChangePasswordDto
   */
  @ApiModelProperty({ description: 'encrypted password', example: 'MTExMQ==' })
  @IsString()
  @IsNotEmpty()
  password: string
}