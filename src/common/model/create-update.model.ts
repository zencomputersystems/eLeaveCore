/**
 * base model for all table
 *
 * @export
 * @class CreateUpdateModel
 */
export class CreateUpdateModel {
    /**
     * User guid who update
     *
     * @type {string}
     * @memberof CreateUpdateModel
     */
    UPDATE_USER_GUID: string;

    /**
     * Time of update
     *
     * @type {string}
     * @memberof CreateUpdateModel
     */
    UPDATE_TS: string;

    /**
     * Time of create
     *
     * @type {string}
     * @memberof CreateUpdateModel
     */
    CREATION_TS: string;

    /**
     * user guid who create
     *
     * @type {string}
     * @memberof CreateUpdateModel
     */
    CREATION_USER_GUID: string;
}