import { UserEmployeeDTO } from "./user-employee.dto";
import { UserSpouseDTO } from "./user-spouse.dto";
import { UserChildrenDTO } from "./user-children.dto";
import { UserEducationDTO } from "./user-education.dto";
import { UserCertificationDTO } from "./user-certification.dto";
import { IsNotEmpty, ValidateNested } from "class-validator";
import { UserFamilyDTO } from "./user-family.dto";
import { Type } from "class-transformer";

export class UserDto {
    @IsNotEmpty()
    readonly employeeId: string;

    @IsNotEmpty()
    readonly phoneNumber: string;

    @IsNotEmpty()
    readonly companyNumber: string;

    @IsNotEmpty()
    readonly maritalStatus: number;

    @IsNotEmpty()
    readonly icNumber: string;

    @IsNotEmpty()
    readonly dob: Date;

    @IsNotEmpty()
    readonly gender: number;

    @IsNotEmpty()
    readonly email: string;

    // residential address info
    @IsNotEmpty()
    readonly address1: string;

    readonly address2: string;

    @IsNotEmpty()
    readonly city: string;

    @IsNotEmpty()
    readonly postcode: string;

    @IsNotEmpty()
    readonly state: string;

    @IsNotEmpty()
    readonly country: string;

    // family info
    @Type(() => UserFamilyDTO)
    @ValidateNested()
    readonly families: UserFamilyDTO[];

    // education info
    @Type(() => UserEducationDTO)
    @ValidateNested()
    readonly educations: UserEducationDTO[];

    // professional cert info
    @Type(() => UserCertificationDTO)
    @ValidateNested()
    readonly professionalCertification: UserCertificationDTO[];

    // employee info
    @IsNotEmpty()
    @Type(() => UserEmployeeDTO)
    @ValidateNested()
    readonly employmentDetail: UserEmployeeDTO;

}