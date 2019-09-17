import { CreateUpdateModel } from 'src/common/model/create-update.model';

/**
 * Model to create holiday
 *
 * @export
 * @class CreateHolidayModel
 * @extends {CreateUpdateModel}
 */
export class CreateHolidayModel extends CreateUpdateModel {
    /**
     * Calendar guid
     *
     * @type {string}
     * @memberof CreateHolidayModel
     */
    CALENDAR_GUID: string;

    /**
     * Code
     *
     * @type {string}
     * @memberof CreateHolidayModel
     */
    CODE: string;

    /**
     *  Properties xml for holiday
     *
     * @type {string}
     * @memberof CreateHolidayModel
     */
    PROPERTIES_XML: string;

    /**
     * Filter criteria
     *
     * @type {string}
     * @memberof CreateHolidayModel
     */
    FILTER_CRITERIA: string;
} 