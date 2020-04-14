/**
 * Data user import
 *
 * @export
 * @class UserImport
 */
export class UserImport {

    /**
     *Creates an instance of UserImport.
     * @param {string} USER_GUID Data user import - user guid
     * @param {string} EMAIL Data user import - email
     * @param {string} STAFF_ID Data user import - staff id
     * @param {string} NAME Data user import - name
     * @memberof UserImport
     */
    constructor(
        public USER_GUID: string,
        public EMAIL: string,
        public STAFF_ID: string,
        public NAME: string,
        public JOIN_DATE: string,
        public SECTION: string,
        public TENANT_COMPANY_GUID: string,
        public COMPANY_NAME: string) { }
}