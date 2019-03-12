export class UserInfoModel {
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

    JOIN_DATE: string;
    CONFIRMATION_DATE: string;
    RESIGNATION_DATE: string;
    EMPLOYEE_STATUS: number;
    EMPLOYEE_TYPE: number;

    PROPERTIES_XML: string;

    ATTACHMENT_ID: string;

    PR_EPF_NUMBER: string;
    PR_INCOMETAX_NUMBER: string;
    BANK: string;
    PR_ACCOUNT_NUMBER: string;

    //ACTIVE_FLAG: number;
    CREATION_TS: string;
    CREATION_USER_GUID: string;
    UPDATE_TS: string;
    UPDATE_USER_GUID: string;
    TENANT_GUID: string;
    DELETED_AT: string;
}