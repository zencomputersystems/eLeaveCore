import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { UserEmergencyContactDTO } from './user-emergency-contact.dto';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 *
 *
 * @export
 * @class UserEmergencyContactDetailDTO
 */
export class UserEmergencyContactDetailDTO {

    @ApiModelProperty({ type: UserEmergencyContactDTO })
    @Type(() => UserEmergencyContactDTO)
    @ValidateNested()
    contacts: UserEmergencyContactDTO[];

}