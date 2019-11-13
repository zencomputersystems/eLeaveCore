/**
 * Model for user
 *
 * @export
 * @class UserModel
 */
export class UserModel {
   /**
    * User model - user guid
    *
    * @type {string}
    * @memberof UserModel
    */
   USER_GUID: string;
   /**
    * User model - tenant guid
    *
    * @type {string}
    * @memberof UserModel
    */
   TENANT_GUID: string;
   /**
    * User model - staff id
    *
    * @type {string}
    * @memberof UserModel
    */
   STAFF_ID: string;
   /**
    * User model - login id
    *
    * @type {string}
    * @memberof UserModel
    */
   LOGIN_ID: string;
   /**
    * User model - password
    *
    * @type {string}
    * @memberof UserModel
    */
   PASSWORD: string;
   /**
    * User model - email
    *
    * @type {string}
    * @memberof UserModel
    */
   EMAIL: string;
   /**
    * User model - activation flag
    *
    * @type {number}
    * @memberof UserModel
    */
   ACTIVATION_FLAG: number;
   /**
    * User model - creation timestamp
    *
    * @type {string}
    * @memberof UserModel
    */
   CREATION_TS: string;
   /**
    * User model - creator user guid
    *
    * @type {string}
    * @memberof UserModel
    */
   CREATION_USER_GUID: string;
   /**
    * User model - update timestamp
    *
    * @type {string}
    * @memberof UserModel
    */
   UPDATE_TS: string;
   /**
    * User model - updator user guid
    *
    * @type {string}
    * @memberof UserModel
    */
   UPDATE_USER_GUID: string;
   /**
    * User model - is tenant admin
    *
    * @type {string}
    * @memberof UserModel
    */
   IS_TENANT_ADMIN: string;
   /**
    * User Model - deleted at
    *
    * @type {string}
    * @memberof UserModel
    */
   DELETED_AT: string;
}