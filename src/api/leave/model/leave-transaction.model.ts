import { STATESDTO } from 'src/common/approval/dto/states.dto';
import { CreateUpdateModel } from 'src/common/model/create-update.model';

/**
 * Model for leave transaction
 *
 * @export
 * @class LeaveTransactionModel
 * @extends {CreateUpdateModel}
 */
export class LeaveTransactionModel extends CreateUpdateModel {

    /**
     *Creates an instance of LeaveTransactionModel.
     * @memberof LeaveTransactionModel
     */
    constructor() {
        super();
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
    Is_Half_Day: boolean;
    Half_Date: Date;
    AM_PM: string;

    TENANT_GUID: string;
    TENANT_COMPANY_GUID: string;
    LEAVE_TYPE_GUID: string;
    ENTITLEMENT_GUID: string;
    USER_GUID: string;

    ACTIVE_FLAG: boolean;
    DELETED_AT: string;

    //TMP
    STATES: string;
    CURRENT_APPROVAL_LEVEL: number;

}