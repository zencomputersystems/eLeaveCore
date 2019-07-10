import { CreateUpdateModel } from 'src/common/model/create-update.model';

/**
 * Model for company
 *
 * @export
 * @class CompanyModel
 * @extends {CreateUpdateModel}
 */
export class CompanyModel extends CreateUpdateModel {
    /**
     * Tenant company guid
     *
     * @type {string}
     * @memberof CompanyModel
     */
    TENANT_COMPANY_GUID: string;

    /**
     * Name
     *
     * @type {string}
     * @memberof CompanyModel
     */
    NAME: string;

    /**
     * Registration no
     *
     * @type {string}
     * @memberof CompanyModel
     */
    REGISTRATION_NO: string;

    /**
     * Address
     *
     * @type {string}
     * @memberof CompanyModel
     */
    ADDRESS: string;

    /**
     * Activation flag
     *
     * @type {number}
     * @memberof CompanyModel
     */
    ACTIVATION_FLAG: number;

    /**
     * Tenant guid
     *
     * @type {string}
     * @memberof CompanyModel
     */
    TENANT_GUID: string;

    /**
     * Delete at
     *
     * @type {string}
     * @memberof CompanyModel
     */
    DELETED_AT: string;
}