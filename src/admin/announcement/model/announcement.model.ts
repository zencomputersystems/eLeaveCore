import { CreateUpdateModel } from '../../../common/model/create-update.model';

/**
 * Model for announcement
 *
 * @export
 * @class AnnouncementModel
 * @extends {CreateUpdateModel}
 */
export class AnnouncementModel extends CreateUpdateModel {
  /**
   * Announcement guid
   *
   * @type {string}
   * @memberof AnnouncementModel
   */
  ANNOUNCEMENT_GUID: string;
  /**
   * Title
   *
   * @type {string}
   * @memberof AnnouncementModel
   */
  TITLE: string;
  /**
   * Message
   *
   * @type {string}
   * @memberof AnnouncementModel
   */
  MESSAGE: string;
  /**
   * Is pinned
   *
   * @type {number}
   * @memberof AnnouncementModel
   */
  IS_PINNED: number;
  /**
   * From date to announce
   *
   * @type {string}
   * @memberof AnnouncementModel
   */
  FROM_DATE: string;
  /**
   * To date to announce
   *
   * @type {string}
   * @memberof AnnouncementModel
   */
  TO_DATE: string;
  /**
   * Deleted at
   *
   * @type {string}
   * @memberof AnnouncementModel
   */
  DELETED_AT: string;
}