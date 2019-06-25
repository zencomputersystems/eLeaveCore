import { UserImport } from './user-import';

/**
 * Data user import result
 *
 * @export
 * @class UserImportResult
 */
export class UserImportResult {
    category: string;
    data = new Array<UserImport>();
}