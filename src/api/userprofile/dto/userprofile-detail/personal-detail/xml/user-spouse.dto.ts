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
    @ApiModelProperty({ description: 'Spouse name', example: 'Wai Mun Yee' })
    @IsNotEmpty()
    spouseName: string;

    /**
     * Data user spouse - ic number
     *
     * @type {string}
     * @memberof UserSpouseDTO
     */
    @ApiModelProperty({ description: 'Spouse identification number', example: '901112102212' })
    @IsNotEmpty()
    spouseIdentificationNumber: string;
}