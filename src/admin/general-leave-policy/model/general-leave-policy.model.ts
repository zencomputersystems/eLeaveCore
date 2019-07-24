import { CreateUpdateModel } from '../../../common/model/create-update.model';
export class GeneralLeavePolicyModel extends CreateUpdateModel {
    MAIN_GENERAL_POLICY_GUID: string;
    TENANT_GUID: string;
    TENANT_COMPANY_GUID: string;
    PROPERTIES_XML: string;
    DELETED_AT: string;
}