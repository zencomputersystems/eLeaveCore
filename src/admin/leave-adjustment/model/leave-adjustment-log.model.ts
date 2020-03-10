import { CreateUpdateModel } from '../../../common/model/create-update.model';
/**
 * Leave adjustment log model
 *
 * @export
 * @class LeaveAdjustmentLogModel
 * @extends {CreateUpdateModel}
 */
export class LeaveAdjustmentLogModel extends CreateUpdateModel {
  /**
   * Leave adjustment log guid
   *
   * @type {string}
   * @memberof LeaveAdjustmentLogModel
   */
  LEAVE_ADJUSTMENT_LOG_GUID: string;
  /**
   * Tenant guid
   *
   * @type {string}
   * @memberof LeaveAdjustmentLogModel
   */
  TENANT_GUID: string;
  /**
   * User guid
   *
   * @type {string}
   * @memberof LeaveAdjustmentLogModel
   */
  USER_GUID: string;
  /**
   * Leave type guid
   *
   * @type {string}
   * @memberof LeaveAdjustmentLogModel
   */
  LEAVE_TYPE_GUID: string;
  /**
   * Adjustment
   *
   * @type {string}
   * @memberof LeaveAdjustmentLogModel
   */
  ADJUSTMENT: string;
  /**
   * Remarks
   *
   * @type {string}
   * @memberof LeaveAdjustmentLogModel
   */
  REMARKS: string;
}