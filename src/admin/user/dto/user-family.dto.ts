import { UserSpouseDTO } from "./user-spouse.dto";

import { UserChildrenDTO } from "./user-children.dto";

import { IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class UserFamilyDTO {
    @Type(() => UserSpouseDTO)
    @ValidateNested()
    readonly spouses: UserSpouseDTO[];

    @Type(() => UserChildrenDTO)
    @ValidateNested()
    readonly childrens: UserChildrenDTO[];

    @IsNotEmpty()
    readonly emergencyContact1: string;

    readonly emergencyContact2: string;
}