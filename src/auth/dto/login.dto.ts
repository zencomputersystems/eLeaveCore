
import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
/**
 *
 *
 * @export
 * @class LoginDto
 */
export class LoginDto {
    @ApiModelProperty({description:'Email id account',example:'tarmimi@zen.com.my'})
    @IsNotEmpty()
    readonly email: string;

    @ApiModelProperty({description:'Password for email account',example:'P@ss1234'})
    @IsNotEmpty()
    readonly password: string;

} 