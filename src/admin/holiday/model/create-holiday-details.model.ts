import { CreateUpdateModel } from 'src/common/model/create-update.model';

/**
 * Model for calendar profile details
 *
 * @export
 * @class CreateHolidayDetailsModel
 * @extends {CreateUpdateModel}
 */
export class CreateHolidayDetailsModel extends CreateUpdateModel {
  /**
   * Calendar profile details guid
   *
   * @type {string}
   * @memberof CreateHolidayDetailsModel
   */
  CALENDAR_DETAILS_GUID: string;
  /**
   * Calendar profile guid
   *
   * @type {string}
   * @memberof CreateHolidayDetailsModel
   */
  CALENDAR_GUID: string;
  /**
   * Year of calendar
   *
   * @type {number}
   * @memberof CreateHolidayDetailsModel
   */
  YEAR: number;
  /**
   * Calendar profile data holiday
   *
   * @type {string}
   * @memberof CreateHolidayDetailsModel
   */
  PROPERTIES_XML: string;

}