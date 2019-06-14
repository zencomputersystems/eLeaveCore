import { UserprofileListSubCategoty } from "./userprofile-list-subcategory.dto";

/**
 *
 *
 * @export
 * @class UserprofileListMainCategory
 */
export class UserprofileListMainCategory {
    mainCategoryName: string;
    subCategory = new Array<UserprofileListSubCategoty>();
}