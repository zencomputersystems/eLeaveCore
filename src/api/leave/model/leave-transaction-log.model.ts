import { CreateUpdateModel } from 'src/common/model/create-update.model';

/**
 * Model for leave transaction log
 *
 * @export
 * @class LeaveTransactionLogModel
 * @extends {CreateUpdateModel}
 */
export class LeaveTransactionLogModel extends CreateUpdateModel {
  /**
   *Creates an instance of LeaveTransactionLogModel.
   * @memberof LeaveTransactionLogModel
   */
  constructor() {
    super();
    this.CREATION_TS = new Date().toISOString();
  }

  /**
   * Log guid
   *
   * @type {string}
   * @memberof LeaveTransactionLogModel
   */
  LOG_GUID: string;
  /**
   * Tenant guid
   *
   * @type {string}
   * @memberof LeaveTransactionLogModel
   */
  TENANT_GUID: string;
  /**
   * Leave transaction guid
   *
   * @type {string}
   * @memberof LeaveTransactionLogModel
   */
  LEAVE_TRANSACTION_GUID: string;
  /**
   * Status process [APPROVED, REJECTED, CANCELLED]
   *
   * @type {string}
   * @memberof LeaveTransactionLogModel
   */
  STATUS: string;
  /**
   * Process leave [APPROVAL_OVERRIDE,APPLY,APPROVAL]
   *
   * @type {string}
   * @memberof LeaveTransactionLogModel
   */
  PROCESS: string;
  /**
   * Remarks
   *
   * @type {string}
   * @memberof LeaveTransactionLogModel
   */
  REMARKS: string;

}