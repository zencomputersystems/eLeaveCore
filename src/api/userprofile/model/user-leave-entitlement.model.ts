import { CreateUpdateModel } from "src/common/model/create-update.model";

/**
 *
 *
 * @export
 * @class UserLeaveEntitlementModel
 * @extends {CreateUpdateModel}
 */
export class UserLeaveEntitlementModel extends CreateUpdateModel {
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
    DELETED_AT: string;
}