import { CreateUpdateModel } from '../../../common/model/create-update.model';
/**
 * Company base model - refactor purpose
 *
 * @export
 * @class CompanyBase
 * @extends {CreateUpdateModel}
 */
export class CompanyBase extends CreateUpdateModel {
    /**
     * company guid
     *
     * @type {string}
     * @memberof CompanyBase
     */
    TENANT_COMPANY_GUID: string;
    /**
     * reg no
     *
     * @type {string}
     * @memberof CompanyBase
     */
    REGISTRATION_NO: string; //
    /**
     * activation flag
     *
     * @type {number}
     * @memberof CompanyBase
     */
    ACTIVATION_FLAG: number; //
    /**
     * tenant guid
     *
     * @type {string}
     * @memberof CompanyBase
     */
    TENANT_GUID: string; //
    /**
     * deleted at
     *
     * @type {string}
     * @memberof CompanyBase
     */
    DELETED_AT: string; //
}