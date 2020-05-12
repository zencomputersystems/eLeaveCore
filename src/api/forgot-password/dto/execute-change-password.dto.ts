import { ChangePasswordDto } from './change-password.dto';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
/**
 * Execute change password dto
 *
 * @export
 * @class ExecuteChangePasswordDto
 * @extends {ChangePasswordDto}
 */
export class ExecuteChangePasswordDto extends ChangePasswordDto {
  /**
   * Old password
   *
   * @type {string}
   * @memberof ExecuteChangePasswordDto
   */
  @ApiModelProperty({ description: 'encrypted password', example: 'YWJjMTIz' })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;
}