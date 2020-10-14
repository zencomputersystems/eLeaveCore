
import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
/**
 * Data for login
 *
 * @export
 * @class LoginDto
 */
export class LoginDto {
    /**
     * Data login - email
     *
     * @type {string}
     * @memberof LoginDto
     */
    @ApiModelProperty({ description: 'Email id account', example: 'kenna.ratke35@ethereal.email' })
    @IsNotEmpty()
    readonly email: string;

    /**
     * Data login - password
     *
     * @type {string}
     * @memberof LoginDto
     */
    @ApiModelProperty({ description: 'Password for email account', example: 'MTIzNDU2' })
    @IsNotEmpty()
    password: string;

}
