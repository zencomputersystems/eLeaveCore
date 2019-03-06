import { UserSpouseDTO } from "./user-spouse.dto";
import { UserChildrenDTO } from "./user-children.dto";

export class UserFamilyDTO {

    spouse: UserSpouseDTO[];
    child: UserChildrenDTO[];
}