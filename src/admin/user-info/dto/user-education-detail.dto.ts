import { UserEducationDTO } from "./user-education.dto";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

export class UserEducationDetailDTO {

    @Type(() => UserEducationDTO)
    @ValidateNested()
    educationDetail: UserEducationDTO[]
}