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
   * Tenant guid
   *
   * @type {string}
   * @memberof AnnouncementModel
   */
  TENANT_GUID: string;
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
   * Attachment filename
   *
   * @type {string}
   * @memberof AnnouncementModel
   */
  ATTACHMENT: string;
  /**
   * Deleted at
   *
   * @type {string}
   * @memberof AnnouncementModel
   */
  DELETED_AT: string;
}