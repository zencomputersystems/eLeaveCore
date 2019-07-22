import { CompanyBase } from './company-base.model';

/**
 * Company model
 *
 * @export
 * @class CompanyModel
 * @extends {CompanyBase}
 */
export class CompanyModel extends CompanyBase {

    /**
     * Company name
     *
     * @type {string}
     * @memberof CompanyModel
     */
    NAME: string;
}