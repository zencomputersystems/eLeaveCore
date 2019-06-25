import { UserprofileListSubCategoty } from './userprofile-list-subcategory.dto';

/**
 * Data user profile list main category
 *
 * @export
 * @class UserprofileListMainCategory
 */
export class UserprofileListMainCategory {
    mainCategoryName: string;
    subCategory = new Array<UserprofileListSubCategoty>();
}