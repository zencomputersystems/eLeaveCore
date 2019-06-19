import { CreateUpdateModel } from 'src/common/model/create-update.model';

/**
 *
 *
 * @export
 * @class CostCentreModel
 * @extends {CreateUpdateModel}
 */
export class CostCentreModel extends CreateUpdateModel {
    COST_CENTRE_GUID: string;
    NAME: string;
    ACTIVE_FLAG: number;
    TENANT_GUID: string;
    DELETED_AT: string;
} 