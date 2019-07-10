import { CreateUpdateModel } from 'src/common/model/create-update.model';

/**
 * Model for cost centre
 *
 * @export
 * @class CostCentreModel
 * @extends {CreateUpdateModel}
 */
export class CostCentreModel extends CreateUpdateModel {
    /**
     * Cost centre guid
     *
     * @type {string}
     * @memberof CostCentreModel
     */
    COST_CENTRE_GUID: string;

    /**
     * Name
     *
     * @type {string}
     * @memberof CostCentreModel
     */
    NAME: string;

    /**
     * Active flag
     *
     * @type {number}
     * @memberof CostCentreModel
     */
    ACTIVE_FLAG: number;

    /**
     * Tenant guid
     *
     * @type {string}
     * @memberof CostCentreModel
     */
    TENANT_GUID: string;

    /**
     * Delete at
     *
     * @type {string}
     * @memberof CostCentreModel
     */
    DELETED_AT: string;
} 