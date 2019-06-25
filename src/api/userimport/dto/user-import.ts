/**
 * Data user import
 *
 * @export
 * @class UserImport
 */
export class UserImport {
    
    /**
     *Creates an instance of UserImport.
     * @param {string} USER_GUID
     * @param {string} EMAIL
     * @param {string} STAFF_ID
     * @param {string} NAME
     * @memberof UserImport
     */
    constructor(
        public USER_GUID: string,
        public EMAIL: string,
        public STAFF_ID: string,
        public NAME: string) {}
}