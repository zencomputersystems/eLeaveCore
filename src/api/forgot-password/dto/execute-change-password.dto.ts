import { ChangePasswordDto } from './change-password.dto';
import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
export class ExecuteChangePasswordDto extends ChangePasswordDto {
  @ApiModelProperty({ description: 'encrypted password', example: 'dnwkejfnoiwenf' })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;
}