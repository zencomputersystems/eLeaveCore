import { CreateUpdateModel } from 'src/common/model/create-update.model';

/**
 * Model for leavetype entitlement
 *
 * @export
 * @class LeaveTypeEntitlementModel
 * @extends {CreateUpdateModel}
 */
export class LeaveTypeEntitlementModel extends CreateUpdateModel {
    /**
     * Entitlement guid
     *
     * @type {string}
     * @memberof LeaveTypeEntitlementModel
     */
    ENTITLEMENT_GUID: string;

    /**
     * Leave type guid
     *
     * @type {string}
     * @memberof LeaveTypeEntitlementModel
     */
    LEAVE_TYPE_GUID: string;

    /**
     * Code name
     *
     * @type {string}
     * @memberof LeaveTypeEntitlementModel
     */
    CODE: string;

    /**
     * Description
     *
     * @type {string}
     * @memberof LeaveTypeEntitlementModel
     */
    DESCRIPTION: string;

    /**
     * Properties XML
     *
     * @type {string}
     * @memberof LeaveTypeEntitlementModel
     */
    PROPERTIES_XML: string;

    /**
     * Tenant guid
     *
     * @type {string}
     * @memberof LeaveTypeEntitlementModel
     */
    TENANT_GUID: string;

    /**
     * Tenant company guid
     *
     * @type {string}
     * @memberof LeaveTypeEntitlementModel
     */
    TENANT_COMPANY_GUID: string;

    /**
     * Active flag
     *
     * @type {number}
     * @memberof LeaveTypeEntitlementModel
     */
    ACTIVE_FLAG: number;

} 