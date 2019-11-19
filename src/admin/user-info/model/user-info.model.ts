import { CreateUpdateModel } from 'src/common/model/create-update.model';

/**
 * User info model
 *
 * @export
 * @class UserInfoModel
 */
export class UserInfoModel extends CreateUpdateModel {
  /**
   * User info guid - PK
   *
   * @type {string}
   * @memberof UserInfoModel
   */
  USER_INFO_GUID: string;

  /**
   * User guid - FK
   *
   * @type {string}
   * @memberof UserInfoModel
   */
  USER_GUID: string;

  /**
   * Fullname
   *
   * @type {string}
   * @memberof UserInfoModel
   */
  FULLNAME: string;

  /**
   * Nickname
   *
   * @type {string}
   * @memberof UserInfoModel
   */
  NICKNAME: string;

  // SALUTATION here (skipped)

  /**
   * Manager user guid - reporting to whom
   *
   * @type {string}
   * @memberof UserInfoModel
   */
  MANAGER_USER_GUID: string;

  // PERSONAL_ID_TYPE here (skipped)

  /**
   * Personal id
   *
   * @type {string}
   * @memberof UserInfoModel
   */
  PERSONAL_ID: string;

  /**
   * Date of birth
   *
   * @type {string}
   * @memberof UserInfoModel
   */
  DOB: string;

  /**
   * Gender
   *
   * @type {number}
   * @memberof UserInfoModel
   */
  GENDER: number;

  /**
   * Join date
   *
   * @type {Date}
   * @memberof UserInfoModel
   */
  JOIN_DATE: Date;

  /**
  * Marital status
  *
  * @type {number}
  * @memberof UserInfoModel
  */
  MARITAL_STATUS: number;

  /**
  * Division name
  *
  * @type {string}
  * @memberof UserInfoModel
  */
  DIVISION: string;

  /**
    * Employee type
    *
    * @type {string}
    * @memberof UserInfoModel
    */
  EMPLOYEE_TYPE: string;

  /**
    * Employee status
    *
    * @type {string}
    * @memberof UserInfoModel
    */
  EMPLOYEE_STATUS: string;

  /**
   * Department name - employee belong to which department
   *
   * @type {string}
   * @memberof UserInfoModel
   */
  DEPARTMENT: string;

  /**
   * Branch name - employee belong to which branch
   *
   * @type {string}
   * @memberof UserInfoModel
   */
  BRANCH: string;

  /**
   * Designation name - employee job title
   *
   * @type {string}
   * @memberof UserInfoModel
   */
  DESIGNATION: string

  /**
   * Costcentre name - employee belong to which costcentre
   *
   * @type {string}
   * @memberof UserInfoModel
   */
  COSTCENTRE: string;

  /**
   * Section name - employee belong to which section
   *
   * @type {string}
   * @memberof UserInfoModel
   */
  SECTION: string;

  /**
   * Country name - employee belong to which country 
   *
   * @type {string}
   * @memberof UserInfoModel
   */
  COUNTRY: string;

  /**
   * Resignation date
   *
   * @type {Date}
   * @memberof UserInfoModel
   */
  RESIGNATION_DATE: Date;

  /**
   * Confirmation date
   *
   * @type {Date}
   * @memberof UserInfoModel
   */
  CONFIRMATION_DATE: Date;

  /**
   * Tenant company guid - Employee Company Information
   *
   * @type {string}
   * @memberof UserInfoModel
   */
  TENANT_COMPANY_GUID: string;

  /**
   * Tenant company site guid
   *
   * @type {string}
   * @memberof UserInfoModel
   */
  TENANT_COMPANY_SITE_GUID: string;

  // EMG_CONTACT_NAME_1 here (skipped)
  // EMG_RELATIONSHIP_1
  // EMG_CONTACT_NUMBER_1
  // EMG_CONTACT_NAME_2
  // EMG_RELATIONSHIP_2
  // EMG_CONTACT_NUMBER_2

  /**
   * PR epf number
   *
   * @type {string}
   * @memberof UserInfoModel
   */
  PR_EPF_NUMBER: string;

  /**
   * PR income tax number
   *
   * @type {string}
   * @memberof UserInfoModel
   */
  PR_INCOMETAX_NUMBER: string;

  /**
   * Bank
   *
   * @type {string}
   * @memberof UserInfoModel
   */
  BANK: string;

  /**
   * PR account number
   *
   * @type {string}
   * @memberof UserInfoModel
   */
  PR_ACCOUNT_NUMBER: string;

  /**
   * Attachment id
   *
   * @type {string}
   * @memberof UserInfoModel
   */
  ATTACHMENT_ID: string;

  /**
   * Properties xml
   *
   * @type {string}
   * @memberof UserInfoModel
   */
  PROPERTIES_XML: string;

  /**
   *Tenant guid
   *
   * @type {string}
   * @memberof UserInfoModel
   */
  TENANT_GUID: string;

  /**
   * Role guid
   *
   * @type {string}
   * @memberof UserInfoModel
   */
  ROLE_GUID: string;

  /**
   * Calendar guid
   *
   * @type {string}
   * @memberof UserInfoModel
   */
  CALENDAR_GUID: string;

  /**
   * Working hours guid
   *
   * @type {string}
   * @memberof UserInfoModel
   */
  WORKING_HOURS_GUID: string;

  /**
   * Deleted at
   *
   * @type {string}
   * @memberof UserInfoModel
   */
  DELETED_AT: string;

}
