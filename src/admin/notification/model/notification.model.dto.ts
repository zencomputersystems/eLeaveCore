/**
 * Model for assign notification rule
 *
 * @export
 * @class NotificationModel
 */
export class NotificationModel {
    /**
     * Queue guid
     *
     * @type {string}
     * @memberof NotificationModel
     */
    QUEUE_GUID: string;
    /**
     * User guid
     *
     * @type {string}
     * @memberof NotificationModel
     */
    USER_GUID: string;
    /**
     * Message notification
     *
     * @type {string}
     * @memberof NotificationModel
     */
    MESSAGE: string;
    /**
     * Read status
     *
     * @type {number}
     * @memberof NotificationModel
     */
    READ_STATUS: number;
    /**
     * Creation timestamp
     *
     * @type {string}
     * @memberof NotificationModel
     */
    CREATION_TS: string;
    /**
     * Category notification
     *
     * @type {string}
     * @memberof NotificationModel
     */
    CATEGORY: string;
    /**
     * Properties xml
     * Remarks for notification
     *
     * @type {string}
     * @memberof NotificationModel
     */
    PROPERTIES_XML: string;
}
