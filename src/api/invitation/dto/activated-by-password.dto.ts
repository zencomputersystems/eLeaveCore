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
    @ApiModelProperty()
    @IsNotEmpty()
    password: string;

    /**
     * Data activated by password - id
     *
     * @type {string}
     * @memberof ActivatedByPassword
     */
    @ApiModelProperty()
    // invitation guid
    @IsNotEmpty()
    id: string;
}