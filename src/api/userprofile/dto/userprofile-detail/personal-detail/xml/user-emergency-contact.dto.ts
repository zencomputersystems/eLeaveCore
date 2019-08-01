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
    @ApiModelProperty({ description: 'Emergency contact name', example: 'Raymond' })
    @IsNotEmpty()
    contactName: string;

    /**
     * Data user emergency contact - contact number
     *
     * @type {string}
     * @memberof UserEmergencyContactDTO
     */
    @ApiModelProperty({ description: 'Emergency contact number', example: '0197993312' })
    @IsNotEmpty()
    contactNumber: string;
}