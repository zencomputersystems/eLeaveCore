import { CreateUpdateModel } from 'src/common/model/create-update.model';

/**
 * User info model
 *
 * @export
 * @class UserInfoModel
 */
export class UserInfoModel extends CreateUpdateModel {
    /**
     * User info guid
     *
     * @type {string}
     * @memberof UserInfoModel
     */
    USER_INFO_GUID: string; //PK
    /**
     * User guid
     *
     * @type {string}
     * @memberof UserInfoModel
     */
    USER_GUID: string; //FK

    // Personal Information
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
    /**
     * Personal id
     *
     * @type {string}
     * @memberof UserInfoModel
     */
    PERSONAL_ID: string;

    // Employee Company Information
    /**
     * Tenant company guid
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
    /**
     * Manager user guid
     *
     * @type {string}
     * @memberof UserInfoModel
     */
    MANAGER_USER_GUID: string; //reporting to whom

    /**
     * Branch name
     *
     * @type {string}
     * @memberof UserInfoModel
     */
    BRANCH: string; //employee belong to which branch
    /**
     * Department name
     *
     * @type {string}
     * @memberof UserInfoModel
     */
    DEPARTMENT: string; //employee belong to which department
    /**
     * Designation name
     *
     * @type {string}
     * @memberof UserInfoModel
     */
    DESIGNATION: string //employee job title
    /**
     * Division name
     *
     * @type {string}
     * @memberof UserInfoModel
     */
    DIVISION: string;

    /**
     * Join date
     *
     * @type {Date}
     * @memberof UserInfoModel
     */
    JOIN_DATE: Date;
    /**
     * Confirmation date
     *
     * @type {Date}
     * @memberof UserInfoModel
     */
    CONFIRMATION_DATE: Date;
    /**
     * Resignation date
     *
     * @type {Date}
     * @memberof UserInfoModel
     */
    RESIGNATION_DATE: Date;
    /**
     * Employee status
     *
     * @type {number}
     * @memberof UserInfoModel
     */
    EMPLOYEE_STATUS: number;
    /**
     * Employee type
     *
     * @type {string}
     * @memberof UserInfoModel
     */
    EMPLOYEE_TYPE: string;

    /**
     * Properties xml
     *
     * @type {string}
     * @memberof UserInfoModel
     */
    PROPERTIES_XML: string;

    /**
     * Attachment id
     *
     * @type {string}
     * @memberof UserInfoModel
     */
    ATTACHMENT_ID: string;

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

    //ACTIVE_FLAG: number;
    /**
     *Tenant guid
     *
     * @type {string}
     * @memberof UserInfoModel
     */
    TENANT_GUID: string;
    /**
     * Deleted at
     *
     * @type {string}
     * @memberof UserInfoModel
     */
    DELETED_AT: string;

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
}