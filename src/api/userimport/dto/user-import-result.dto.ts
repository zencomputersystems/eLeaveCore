import { UserImport } from './user-import';

/**
 * Data user import result
 *
 * @export
 * @class UserImportResult
 */
export class UserImportResult {
    /**
     * Data import user - category
     *
     * @type {string}
     * @memberof UserImportResult
     */
    category: string;
    /**
     * Data import user - data
     *
     * @memberof UserImportResult
     */
    data = new Array<UserImport>();
}