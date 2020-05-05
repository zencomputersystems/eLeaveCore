import { ApiModelProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class ChangePasswordDto {
  @ApiModelProperty({ description: 'login id', example: 'usadnenwfklan' })
  @IsString()
  @IsNotEmpty()
  loginId: string;

  @ApiModelProperty({ description: 'encrypted password', example: 'MTExMQ==' })
  @IsString()
  @IsNotEmpty()
  password: string
}