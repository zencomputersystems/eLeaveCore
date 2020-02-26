import { CreateUpdateModel } from '../../../common/model/create-update.model';
export class LeaveAdjustmentLogModel extends CreateUpdateModel {
  LEAVE_ADJUSTMENT_LOG_GUID: string;
  TENANT_GUID: string;
  USER_GUID: string;
  LEAVE_TYPE_GUID: string;
  ADJUSTMENT: string;
  REMARKS: string;
}