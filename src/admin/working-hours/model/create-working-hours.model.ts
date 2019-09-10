import { CreateUpdateModel } from 'src/common/model/create-update.model';

export class CreateWorkingHoursModel extends CreateUpdateModel {

  WORKING_HOURS_GUID: string;

  CODE: string;

  PROPERTIES_XML: string;

  DESCRIPTION: string;
}