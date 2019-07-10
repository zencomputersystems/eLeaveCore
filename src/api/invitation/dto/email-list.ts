/**
 * Data for email list
 *
 * @export
 * @class EmailList
 */
export class EmailList {

    /**
     *Creates an instance of EmailList.
     * @param {string} userId Id user
     * @param {string} invitationId Id invitation
     * @param {string} name name
     * @param {string} email email
     * @memberof EmailList
     */
    constructor(public userId: string, public invitationId: string, public name: string, public email: string) { }

}