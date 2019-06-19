import { CreateUpdateModel } from 'src/common/model/create-update.model';

/**
 *
 *
 * @export
 * @class SectionModel
 * @extends {CreateUpdateModel}
 */
export class SectionModel extends CreateUpdateModel {
    SECTION_GUID: string;
    NAME: string;
    ACTIVE_FLAG: number;
    TENANT_GUID: string;
    DELETED_AT: string;
} 