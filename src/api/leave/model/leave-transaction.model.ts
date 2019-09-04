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

    /**
     * Leave transaction guid
     *
     * @type {string}
     * @memberof LeaveTransactionModel
     */
    LEAVE_TRANSACTION_GUID: string;

    /**
     * Applied on behalf
     *
     * @type {boolean}
     * @memberof LeaveTransactionModel
     */
    APPLIED_ON_BEHALF: boolean;
    /**
     * Confirmed application
     *
     * @type {boolean}
     * @memberof LeaveTransactionModel
     */
    CONFIRMED_APPLICATION: boolean;
    /**
     * Start date
     *
     * @type {Date}
     * @memberof LeaveTransactionModel
     */
    START_DATE: Date;
    /**
     * End date
     *
     * @type {Date}
     * @memberof LeaveTransactionModel
     */
    END_DATE: Date;
    /**
     * No of days
     *
     * @type {number}
     * @memberof LeaveTransactionModel
     */
    NO_OF_DAYS: number;
    /**
     * CF days
     *
     * @type {number}
     * @memberof LeaveTransactionModel
     */
    CF_DAYS: number;
    /**
     * Status
     *
     * @type {string}
     * @memberof LeaveTransactionModel
     */
    STATUS: string;
    /**
     * Reason
     *
     * @type {string}
     * @memberof LeaveTransactionModel
     */
    REASON: string;
    /**
     * Entitlement xml snapshot
     *
     * @type {string}
     * @memberof LeaveTransactionModel
     */
    ENTITLEMENT_XML_SNAPSHOT: string;
    // /**
    //  * Is half day
    //  *
    //  * @type {boolean}
    //  * @memberof LeaveTransactionModel
    //  */
    // Is_Half_Day: boolean;
    // /**
    //  * Half day date
    //  *
    //  * @type {Date}
    //  * @memberof LeaveTransactionModel
    //  */
    // Half_Date: Date;
    /**
     * Slot of leave
     *
     * @type {string}
     * @memberof LeaveTransactionModel
     */
    TIME_SLOT: string;

    /**
     * Tenant guid
     *
     * @type {string}
     * @memberof LeaveTransactionModel
     */
    TENANT_GUID: string;
    /**
     * Tenant company guid
     *
     * @type {string}
     * @memberof LeaveTransactionModel
     */
    TENANT_COMPANY_GUID: string;
    /**
     * Leave type guid
     *
     * @type {string}
     * @memberof LeaveTransactionModel
     */
    LEAVE_TYPE_GUID: string;
    /**
     * Entitlement guid
     *
     * @type {string}
     * @memberof LeaveTransactionModel
     */
    ENTITLEMENT_GUID: string;
    /**
     * User guid
     *
     * @type {string}
     * @memberof LeaveTransactionModel
     */
    USER_GUID: string;

    /**
     * Active flag
     *
     * @type {boolean}
     * @memberof LeaveTransactionModel
     */
    ACTIVE_FLAG: boolean;
    /**
     * Deleted at
     *
     * @type {string}
     * @memberof LeaveTransactionModel
     */
    DELETED_AT: string;

    //TMP
    /**
     * States
     *
     * @type {string}
     * @memberof LeaveTransactionModel
     */
    STATES: string;
    /**
     * Current approval level
     *
     * @type {number}
     * @memberof LeaveTransactionModel
     */
    CURRENT_APPROVAL_LEVEL: number;

    /**
     * Remarks
     *
     * @type {string}
     * @memberof LeaveTransactionModel
     */
    REMARKS: string;
}