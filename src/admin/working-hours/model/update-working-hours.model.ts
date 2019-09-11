/**
 * Model for update working hours
 *
 * @export
 * @class UpdateWorkingHoursModel
 */
export class UpdateWorkingHoursModel {

  /**
   * Properties xml of working hours profile details
   *
   * @type {string}
   * @memberof UpdateWorkingHoursModel
   */
  PROPERTIES_XML: string;

  /**
   * Update timestamp
   *
   * @type {string}
   * @memberof UpdateWorkingHoursModel
   */
  UPDATE_TS: string;

  /**
   * User guid who update the working hours profile
   *
   * @type {string}
   * @memberof UpdateWorkingHoursModel
   */
  UPDATE_USER_GUID: string;

  /**
   * Code name of working hours profile
   *
   * @type {string}
   * @memberof UpdateWorkingHoursModel
   */
  CODE: string;

  /**
   * Description of working hours profile
   *
   * @type {string}
   * @memberof UpdateWorkingHoursModel
   */
  DESCRIPTION: string;

  /**
   * Deleted at time set inactive
   *
   * @type {string}
   * @memberof UpdateWorkingHoursModel
   */
  DELETED_AT: string;
}