import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * Data user emergency contact
 *
 * @export
 * @class UserEmergencyContactDTO
 */
export class UserEmergencyContactDTO {
    /**
     * Data user emergency contact - contact name
     *
     * @type {string}
     * @memberof UserEmergencyContactDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    contactName: string;

    /**
     * Data user emergency contact - contact number
     *
     * @type {string}
     * @memberof UserEmergencyContactDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    contactNumber: string;
}