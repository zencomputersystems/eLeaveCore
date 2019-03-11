import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { UserEducationDTO } from "./user-education.dto";

export class UserEducationDetailDTO {

    @Type(() => UserEducationDTO)
    @ValidateNested()
    educationDetail: UserEducationDTO[]
}