import { UserprofileListDTO } from './userprofile-list.dto';

/**
 * Data user profile list sub category
 *
 * @export
 * @class UserprofileListSubCategoty
 */
export class UserprofileListSubCategoty {
    subCategoryName: string;
    employeeList = new Array<UserprofileListDTO>();
}