import { UserEmergencyContactDTO } from './user-emergency-contact.dto';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * User's emergency contact details
 *
 * @export
 * @class UserEmergencyContactDetailDTO
 */
export class UserEmergencyContactDetailDTO {

    @ApiModelProperty()
    @Type(() => UserEmergencyContactDTO)
    @ValidateNested()
    contact: UserEmergencyContactDTO[];

}