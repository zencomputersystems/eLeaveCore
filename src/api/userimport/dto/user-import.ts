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
     * @param {string} JOIN_DATE Data user import - join_date
     * @param {string} SECTION Data user import - section
     * @param {string} TENANT_COMPANY_GUID Data user import - tenant company guid
     * @param {string} COMPANY_NAME Data user import - company name
     * 
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