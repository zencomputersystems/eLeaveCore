import { CreateUpdateModel } from 'src/common/model/create-update.model';

/**
 *
 *
 * @export
 * @class CompanyModel
 * @extends {CreateUpdateModel}
 */
export class CompanyModel extends CreateUpdateModel {
    TENANT_COMPANY_GUID: string;
    NAME: string;
    REGISTRATION_NO: string;
    ADDRESS: string;
    ACTIVATION_FLAG: number;
    TENANT_GUID: string;
    DELETED_AT: string;
}