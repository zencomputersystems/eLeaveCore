import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { UserEmergencyContactDTO } from './user-emergency-contact.dto';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * Data for user emergency contact detail
 *
 * @export
 * @class UserEmergencyContactDetailDTO
 */
export class UserEmergencyContactDetailDTO {

    /**
     * Data user emergency conatct detail - contacts
     *
     * @type {UserEmergencyContactDTO[]}
     * @memberof UserEmergencyContactDetailDTO
     */
    @ApiModelProperty({ type: UserEmergencyContactDTO })
    @Type(() => UserEmergencyContactDTO)
    @ValidateNested()
    contacts: UserEmergencyContactDTO[];

}