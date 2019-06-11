import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

/**
 * User's emergency contact
 *
 * @export
 * @class UserEmergencyContactDTO
 */
export class UserEmergencyContactDTO {
    @ApiModelProperty()
    @IsNotEmpty()
    name: string;

    @ApiModelProperty()
    @IsNotEmpty()
    contactNumber: string;
}
