import { UserSpouseDTO } from "./user-spouse.dto";

import { UserChildrenDTO } from "./user-children.dto";

import { IsNotEmpty, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class UserFamilyDTO {
    @Type(() => UserSpouseDTO)
    @ValidateNested()
    spouse: UserSpouseDTO[];

    @Type(() => UserChildrenDTO)
    @ValidateNested()
    child: UserChildrenDTO[];
}