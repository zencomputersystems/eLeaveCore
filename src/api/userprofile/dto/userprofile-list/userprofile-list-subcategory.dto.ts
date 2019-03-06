import { UserprofileListDTO } from "./userprofile-list.dto";

export class UserprofileListSubCategoty {
    subCategoryName: string;
    employeeList = new Array<UserprofileListDTO>();
}