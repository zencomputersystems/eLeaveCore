import { CreateUpdateModel } from "src/common/model/create-update.model";

export class CreateRoleModel extends CreateUpdateModel {
    ROLE_GUID: string;
    CODE: string;
    PROPERTIES_XML: string;
    DESCRIPTION: string;
}