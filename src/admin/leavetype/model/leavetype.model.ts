import { CreateUpdateModel } from 'src/common/model/create-update.model';

/**
 * Model for leavetype
 *
 * @export
 * @class LeaveTypeModel
 * @extends {CreateUpdateModel}
 */
export class LeaveTypeModel extends CreateUpdateModel {
    /**
     * Leave type guid
     *
     * @type {string}
     * @memberof LeaveTypeModel
     */
    LEAVE_TYPE_GUID: string;

    /**
     * Abbreviation
     *
     * @type {string}
     * @memberof LeaveTypeModel
     */
    ABBR: string;

    /**
     * Code name
     *
     * @type {string}
     * @memberof LeaveTypeModel
     */
    CODE: string;

    /**
     * Description
     *
     * @type {string}
     * @memberof LeaveTypeModel
     */
    DESCRIPTION: string;

    /**
     * Active flag
     *
     * @type {number}
     * @memberof LeaveTypeModel
     */
    ACTIVE_FLAG: number;

    /**
     * Tenant guid
     *
     * @type {string}
     * @memberof LeaveTypeModel
     */
    TENANT_GUID: string;

    /**
     * Tenant company guid
     *
     * @type {string}
     * @memberof LeaveTypeModel
     */
    TENANT_COMPANY_GUID: string;

    /**
     * Deleted at
     *
     * @type {string}
     * @memberof LeaveTypeModel
     */
    DELETED_AT: string;
} 