import { CreateUpdateModel } from 'src/common/model/create-update.model';

/**
 * Model for section
 *
 * @export
 * @class SectionModel
 * @extends {CreateUpdateModel}
 */
export class SectionModel extends CreateUpdateModel {
    /**
     * Section guid
     *
     * @type {string}
     * @memberof SectionModel
     */
    SECTION_GUID: string;

    /**
     * Name
     *
     * @type {string}
     * @memberof SectionModel
     */
    NAME: string;

    /**
     * Active flag
     *
     * @type {number}
     * @memberof SectionModel
     */
    ACTIVE_FLAG: number;

    /**
     * Tenant guid
     *
     * @type {string}
     * @memberof SectionModel
     */
    TENANT_GUID: string;

    /**
     * Deleted at
     *
     * @type {string}
     * @memberof SectionModel
     */
    DELETED_AT: string;
} 