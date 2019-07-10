import { CreateUpdateModel } from 'src/common/model/create-update.model';

/**
 * Model for user leave entitlement
 *
 * @export
 * @class UserLeaveEntitlementModel
 * @extends {CreateUpdateModel}
 */
export class UserLeaveEntitlementModel extends CreateUpdateModel {
    /**
     * User leave entitlement guid
     *
     * @type {string}
     * @memberof UserLeaveEntitlementModel
     */
    USER_LEAVE_ENTITLEMENT_GUID: string;
    /**
     * Entitlement guid
     *
     * @type {string}
     * @memberof UserLeaveEntitlementModel
     */
    ENTITLEMENT_GUID: string;
    /**
     * Leave type guid
     *
     * @type {string}
     * @memberof UserLeaveEntitlementModel
     */
    LEAVE_TYPE_GUID: string;
    /**
     * Remarks
     *
     * @type {string}
     * @memberof UserLeaveEntitlementModel
     */
    REMARKS: string;
    /**
     * Properties xml
     *
     * @type {string}
     * @memberof UserLeaveEntitlementModel
     */
    PROPERTIES_XML: string;

    /**
     * Parent flag
     *
     * @type {number}
     * @memberof UserLeaveEntitlementModel
     */
    PARENT_FLAG: number;
    /**
     * CF flag
     *
     * @type {number}
     * @memberof UserLeaveEntitlementModel
     */
    CF_FLAG: number;
    /**
     * Days added
     *
     * @type {number}
     * @memberof UserLeaveEntitlementModel
     */
    DAYS_ADDED: number;
    /**
     * Year
     *
     * @type {number}
     * @memberof UserLeaveEntitlementModel
     */
    YEAR: number; //year the policy is assigned
    /**
     * Expired date
     *
     * @type {Date}
     * @memberof UserLeaveEntitlementModel
     */
    EXPIREDATE: Date;

    /**
     * Active flag
     *
     * @type {number}
     * @memberof UserLeaveEntitlementModel
     */
    ACTIVE_FLAG: number;
    /**
     * User guid
     *
     * @type {string}
     * @memberof UserLeaveEntitlementModel
     */
    USER_GUID: string;
    /**
     * Tenant guid
     *
     * @type {string}
     * @memberof UserLeaveEntitlementModel
     */
    TENANT_GUID: string;
    /**
     * Deleted at
     *
     * @type {string}
     * @memberof UserLeaveEntitlementModel
     */
    DELETED_AT: string;
}