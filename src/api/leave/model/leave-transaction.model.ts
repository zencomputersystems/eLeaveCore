export class LeaveTransactionModel {

    constructor() {
        this.CREATION_TS = new Date().toISOString();
    }

    LEAVE_TRANSACTION_GUID: string;

    APPLIED_ON_BEHALF: boolean;
    CONFIRMED_APPLICATION: boolean;
    START_DATE: Date;
    END_DATE: Date;
    NO_OF_DAYS: number;
    CF_Days: number;
    STATUS: string;
    REASON: string;
    ENTITLEMENT_XML_SNAPSHOT: string;
    Is_Half_Day: true;
    Half_Date: Date;
    AM_PM: string;

    TENANT_GUID: string;
    TENANT_COMPANY_GUID: string;
    LEAVE_TYPE_GUID: string;
    ENTITLEMENT_GUID: string;
    USER_GUID: string;

    ACTIVE_FLAG: boolean;
    CREATION_TS: string;
    CREATION_USER_GUID: string;
    UPDATE_TS: string;
    UPDATE_USER_GUID: string;
    DELETED_AT: string;
    
}