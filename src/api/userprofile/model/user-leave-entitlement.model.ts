export class UserLeaveEntitlementModel {
    USER_LEAVE_ENTITLEMENT_GUID: string;
    ENTITLEMENT_GUID: string;
    LEAVE_TYPE_GUID: string;
    REMARKS: string;
    PROPERTIES_XML: string;

    PARENT_FLAG: number;
    CF_FLAG: number;
    DAYS_ADDED: number;
    YEAR: number; //year the policy is assigned
    EXPIREDATE: Date;

    ACTIVE_FLAG: number;
    USER_GUID: string;
    TENANT_GUID: string;
    CREATION_TS: string;
    CREATION_USER_GUID: string;
    UPDATE_TS: string;
    UPDATE_USER_GUID: string;
    DELETED_AT: string;
}