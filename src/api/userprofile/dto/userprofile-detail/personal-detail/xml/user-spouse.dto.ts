import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * DTO for User Spouse
 *
 * @export
 * @class UserSpouseDTO
 */
export class UserSpouseDTO {
    /**
     * Data user spouse - name
     *
     * @type {string}
     * @memberof UserSpouseDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    spouseName: string;

    /**
     * Data user spouse - ic number
     *
     * @type {string}
     * @memberof UserSpouseDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    spouseIdentificationNumber: string;
}