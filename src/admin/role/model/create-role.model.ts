import { CreateUpdateModel } from 'src/common/model/create-update.model';

/**
 * Model for create role
 *
 * @export
 * @class CreateRoleModel
 * @extends {CreateUpdateModel}
 */
export class CreateRoleModel extends CreateUpdateModel {
    /**
     * Role guid
     *
     * @type {string}
     * @memberof CreateRoleModel
     */
    ROLE_GUID: string;

    /**
     * Code
     *
     * @type {string}
     * @memberof CreateRoleModel
     */
    CODE: string;

    /**
     * Properties XML details
     *
     * @type {string}
     * @memberof CreateRoleModel
     */
    PROPERTIES_XML: string;

    /**
     * Description
     *
     * @type {string}
     * @memberof CreateRoleModel
     */
    DESCRIPTION: string;
}