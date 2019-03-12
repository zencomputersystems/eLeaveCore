import { UserCertificationDTO } from "./user-certification.dto";
import { ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class UserCertificationDetailDTO {
    @Type(() => UserCertificationDTO)
    @ValidateNested()
    certificationDetail: UserCertificationDTO[]
}