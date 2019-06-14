import { CreateUpdateModel } from "src/common/model/create-update.model";

/**
 *
 *
 * @export
 * @class CreateHolidayModel
 * @extends {CreateUpdateModel}
 */
export class CreateHolidayModel extends CreateUpdateModel {
    CALENDAR_GUID: string;
    CODE: string;
    PROPERTIES_XML: string;
} 