import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { UserEmergencyContactDTO } from "./user-emergency-contact.dto";

export class UserEmergencyContactDetailDTO {

    @Type(() => UserEmergencyContactDTO)
    @ValidateNested()
    contacts: UserEmergencyContactDTO[];

}