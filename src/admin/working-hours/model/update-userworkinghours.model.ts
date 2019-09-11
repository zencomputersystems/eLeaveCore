/**
 * Model for Update user working hours
 *
 * @export
 * @class UpdateUserWorkingHoursModel
 */
export class UpdateUserWorkingHoursModel {

  /**
   * Working hours guid
   *
   * @type {string}
   * @memberof UpdateUserWorkingHoursModel
   */
  WORKING_HOURS_GUID: string;

  /**
   * Update timestamp
   *
   * @type {string}
   * @memberof UpdateUserWorkingHoursModel
   */
  UPDATE_TS: string;

  /**
   * User guid of user who update the working hours profile
   *
   * @type {string}
   * @memberof UpdateUserWorkingHoursModel
   */
  UPDATE_USER_GUID: string;
}