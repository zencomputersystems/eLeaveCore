import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * User's emergency contact
 *
 * @export
 * @class UserEmergencyContactDTO
 */
export class UserEmergencyContactDTO {
    /**
     * Data user emergency contact - name
     *
     * @type {string}
     * @memberof UserEmergencyContactDTO
     */
    @ApiModelProperty()
    @IsNotEmpty()
    name: string;

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
