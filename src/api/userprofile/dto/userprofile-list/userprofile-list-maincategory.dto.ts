import { UserprofileListSubCategoty } from './userprofile-list-subcategory.dto';

/**
 * Data user profile list main category
 *
 * @export
 * @class UserprofileListMainCategory
 */
export class UserprofileListMainCategory {
    /**
     * Data user profile list category - category name
     *
     * @type {string}
     * @memberof UserprofileListMainCategory
     */
    mainCategoryName: string;
    /**
     * Data user profile list category - sub category
     *
     * @memberof UserprofileListMainCategory
     */
    subCategory = new Array<UserprofileListSubCategoty>();
}