import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * Data for activated by password
 *
 * @export
 * @class ActivatedByPassword
 */
export class ActivatedByPassword {
    /**
     * Data activated by password - password text
     *
     * @type {string}
     * @memberof ActivatedByPassword
     */
    @ApiModelProperty({ description: 'Employee password', example: 'P@s$w0rD' })
    @IsNotEmpty()
    password: string;

    /**
     * Data activated by password - id
     *
     * @type {string}
     * @memberof ActivatedByPassword
     */
    @ApiModelProperty({ description: 'Employee invitation guid', example: '4e84f750-81c8-11e9-a30e-05621369ef51' })
    // invitation guid
    @IsNotEmpty()
    id: string;
}