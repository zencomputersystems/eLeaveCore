import { CreateUpdateModel } from "src/common/model/create-update.model";

/**
 * Model for create role
 *
 * @export
 * @class CreateRoleModel
 * @extends {CreateUpdateModel}
 */
export class CreateRoleModel extends CreateUpdateModel {
    ROLE_GUID: string;
    CODE: string;
    PROPERTIES_XML: string;
    DESCRIPTION: string;
}