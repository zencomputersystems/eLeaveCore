import { CompanyBase } from './company-base.model';

/**
 * Model for company site
 *
 * @export
 * @class CompanySiteModel
 * @extends {CompanyBase}
 */
export class CompanySiteModel extends CompanyBase {

    /**
     * tenant company site guid
     *
     * @type {string}
     * @memberof CompanySiteModel
     */
    TENANT_COMPANY_SITE_GUID: string;
    /**
     * company site name
     *
     * @type {string}
     * @memberof CompanySiteModel
     */
    SITE_NAME: string;
    /**
     * address 
     *
     * @type {string}
     * @memberof CompanySiteModel
     */
    ADDRESS: string;
    /**
     * address 2
     *
     * @type {string}
     * @memberof CompanySiteModel
     */
    ADDRESS2: string;
    /**
     * address 3
     *
     * @type {string}
     * @memberof CompanySiteModel
     */
    ADDRESS3: string;
    /**
     * contact no
     *
     * @type {string}
     * @memberof CompanySiteModel
     */
    CONTACT_NO: string;
    /**
     * email
     *
     * @type {string}
     * @memberof CompanySiteModel
     */
    EMAIL: string;
    /**
     * contact person name
     *
     * @type {string}
     * @memberof CompanySiteModel
     */
    CONTACT_PERSON: string;
    /**
     * contact person contact no
     *
     * @type {string}
     * @memberof CompanySiteModel
     */
    CONTACT_PERSON_CONTACT_NO: string;
    /**
     * contact person name
     *
     * @type {string}
     * @memberof CompanySiteModel
     */
    CONTACT_PERSON_EMAIL: string;
    /**
     * website
     *
     * @type {string}
     * @memberof CompanySiteModel
     */
    WEBSITE: string;
    /**
     *is hq
     *
     * @type {number}
     * @memberof CompanySiteModel
     */
    ISHQ: number;

}