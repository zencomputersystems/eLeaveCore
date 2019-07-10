import { UserprofileListDTO } from './userprofile-list.dto';

/**
 * Data user profile list sub category
 *
 * @export
 * @class UserprofileListSubCategoty
 */
export class UserprofileListSubCategoty {
    /**
     * Data user profile sub category - name
     *
     * @type {string}
     * @memberof UserprofileListSubCategoty
     */
    subCategoryName: string;
    /**
     * Data user profile sub category - employee list
     *
     * @memberof UserprofileListSubCategoty
     */
    employeeList = new Array<UserprofileListDTO>();
}