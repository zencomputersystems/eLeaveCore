import { UserEmergencyContactDTO } from "./user-emergency-contact.dto";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

export class UserEmergencyContactDetailDTO {

    @Type(() => UserEmergencyContactDTO)
    @ValidateNested()
    contact: UserEmergencyContactDTO[];

}