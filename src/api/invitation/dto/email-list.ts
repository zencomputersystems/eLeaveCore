/**
 * Data for email list
 *
 * @export
 * @class EmailList
 */
export class EmailList {

    /**
     *Creates an instance of EmailList.
     * @param {string} userId
     * @param {string} invitationId
     * @param {string} name
     * @param {string} email
     * @memberof EmailList
     */
    constructor(public userId: string, public invitationId: string, public name: string, public email: string) { }

}