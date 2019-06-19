import { CreateUpdateModel } from 'src/common/model/create-update.model';

/**
 *
 *
 * @export
 * @class LeaveTypeModel
 * @extends {CreateUpdateModel}
 */
export class LeaveTypeModel extends CreateUpdateModel {
    LEAVE_TYPE_GUID: string;
    CODE: string;
    DESCRIPTION: string;
    ACTIVE_FLAG: number;
    TENANT_GUID: string;
    TENANT_COMPANY_GUID: string;
    DELETED_AT: string;
} 