import { CreateUpdateModel } from 'src/common/model/create-update.model';

/**
 * Model for create working hours profile
 *
 * @export
 * @class CreateWorkingHoursModel
 * @extends {CreateUpdateModel}
 */
export class CreateWorkingHoursModel extends CreateUpdateModel {

  /**
   * Working hours guid
   *
   * @type {string}
   * @memberof CreateWorkingHoursModel
   */
  WORKING_HOURS_GUID: string;

  /**
   * Tenant guid
   *
   * @type {string}
   * @memberof CreateRoleModel
   */
  TENANT_GUID: string;

  /**
   * Working hours code name
   *
   * @type {string}
   * @memberof CreateWorkingHoursModel
   */
  CODE: string;

  /**
   * Working hours properties xml details
   *
   * @type {string}
   * @memberof CreateWorkingHoursModel
   */
  PROPERTIES_XML: string;

  /**
   * Working hours profile description
   *
   * @type {string}
   * @memberof CreateWorkingHoursModel
   */
  DESCRIPTION: string;
}