/**
 * Model for user invite
 *
 * @export
 * @class UserInviteModel
 */
export class UserInviteModel {
    /**
     * User invite - invitation guid
     *
     * @type {string}
     * @memberof UserInviteModel
     */
    INVITATION_GUID: string;
    /**
     * User invite - user guid
     *
     * @type {string}
     * @memberof UserInviteModel
     */
    USER_GUID: string;
    /**
     * User invite - tenant guid
     *
     * @type {string}
     * @memberof UserInviteModel
     */
    TENANT_GUID: string;
    /**
     * User invite - email
     *
     * @type {string}
     * @memberof UserInviteModel
     */
    EMAIL: string;
    /**
     * User invite - status
     *
     * @type {number}
     * @memberof UserInviteModel
     */
    STATUS: number;
    /**
     * User invite - creator user guid 
     *
     * @type {string}
     * @memberof UserInviteModel
     */
    CREATION_USER_GUID: string;

    /**
     * User invite - creation timestamp
     *
     * @type {string}
     * @memberof UserInviteModel
     */
    CREATION_TS: string;
    /**
     * User invite - updator user guid
     *
     * @type {string}
     * @memberof UserInviteModel
     */
    UPDATE_USER_GUID: string;
    /**
     * User invite  - update timestamp
     *
     * @type {string}
     * @memberof UserInviteModel
     */
    UPDATE_TS: string;
    /**
     * User invite - deleted at
     *
     * @type {string}
     * @memberof UserInviteModel
     */
    DELETED_AT: string;
}