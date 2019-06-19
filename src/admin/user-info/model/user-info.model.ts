import { CreateUpdateModel } from 'src/common/model/create-update.model';

/**
 * User info model
 *
 * @export
 * @class UserInfoModel
 */
export class UserInfoModel extends CreateUpdateModel {
    USER_INFO_GUID: string; //PK
    USER_GUID: string; //FK

    // Personal Information
    FULLNAME: string;
    NICKNAME: string;
    PERSONAL_ID: string;

    // Employee Company Information
    TENANT_COMPANY_GUID: string;
    TENANT_COMPANY_SITE_GUID: string;
    MANAGER_USER_GUID: string; //reporting to whom

    BRANCH: string; //employee belong to which branch
    DEPARTMENT: string; //employee belong to which department
    DESIGNATION: string //employee job title
    DIVISION: string;

    JOIN_DATE: Date;
    CONFIRMATION_DATE: Date;
    RESIGNATION_DATE: Date;
    EMPLOYEE_STATUS: number;
    EMPLOYEE_TYPE: string;

    PROPERTIES_XML: string;

    ATTACHMENT_ID: string;

    PR_EPF_NUMBER: string;
    PR_INCOMETAX_NUMBER: string;
    BANK: string;
    PR_ACCOUNT_NUMBER: string;

    //ACTIVE_FLAG: number;
    TENANT_GUID: string;
    DELETED_AT: string;

    CALENDAR_GUID: string;
}