import { CreateUpdateModel } from 'src/common/model/create-update.model';

/**
 * Model for leavetype entitlement
 *
 * @export
 * @class LeaveTypeEntitlementModel
 * @extends {CreateUpdateModel}
 */
export class LeaveTypeEntitlementModel extends CreateUpdateModel {
    ENTITLEMENT_GUID: string;
    LEAVE_TYPE_GUID: string;
    CODE: string;
    DESCRIPTION: string;
    PROPERTIES_XML: string;
    TENANT_GUID: string;
    TENANT_COMPANY_GUID: string;
    ACTIVE_FLAG: number;

} 