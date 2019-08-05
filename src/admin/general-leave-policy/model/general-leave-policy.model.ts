import { CreateUpdateModel } from '../../../common/model/create-update.model';
/**
 * Model for general leave policy
 *
 * @export
 * @class GeneralLeavePolicyModel
 * @extends {CreateUpdateModel}
 */
export class GeneralLeavePolicyModel extends CreateUpdateModel {
    /**
     * General leave policy guid
     *
     * @type {string}
     * @memberof GeneralLeavePolicyModel
     */
    MAIN_GENERAL_POLICY_GUID: string;
    /**
     * Tenant guid
     *
     * @type {string}
     * @memberof GeneralLeavePolicyModel
     */
    TENANT_GUID: string;
    /**
     * Tenant company guid
     *
     * @type {string}
     * @memberof GeneralLeavePolicyModel
     */
    TENANT_COMPANY_GUID: string;
    /**
     * Properties xml
     *
     * @type {string}
     * @memberof GeneralLeavePolicyModel
     */
    PROPERTIES_XML: string;
    /**
     * Deleted at
     *
     * @type {string}
     * @memberof GeneralLeavePolicyModel
     */
    DELETED_AT: string;
}