export class UserInfoModel {
    USER_INFO_GUID: string; //PK
    USER_GUID: string; //FK

    // Personal Information
    FULLNAME: string;
    NICKNAME: string;

    // Employee Company Information
    TENANT_COMPANY_GUID: string;
    TENANT_COMPANY_SITE_GUID: string;
    MANAGER_USER_GUID: string; //reporting to whom

    BRANCH: string; //employee belong to which branch
    DEPARTMENT: string; //employee belong to which department
    DESIGNATION: string //employee job title

    JOIN_DATE: Date;
    CONFIRMATION_DATE: Date;
    RESIGNATION_DATE: Date;
    EMPLOYEE_STATUS: number;
    EMPLOYEE_TYPE: number;

    PROPERTIES_XML: string;

    ATTACHMENT_ID: string;

    //ACTIVE_FLAG: number;
    CREATION_TS: string;
    CREATION_USER_GUID: string;
    UPDATE_TS: string;
    UPDATE_USER_GUID: string;
    TENANT_GUID: string;
    DELETED_AT: string;
}