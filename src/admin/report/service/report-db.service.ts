import { Injectable } from '@nestjs/common';
import { UserLeaveEntitlementSummaryDbService } from 'src/api/userprofile/db/user-leave-summary.db.service';
import { LeaveTransactionDbService } from 'src/api/leave/db/leave-transaction.db.service';
import { UserprofileDbService } from 'src/api/userprofile/db/userprofile.db.service';
import { LeaveAdjustmentDbLogService } from '../../leave-adjustment/leave-adjustment-log.service';
import { LeaveTransactionLogDbService } from '../../../api/leave/db/leave-transaction-log.db.service';
import { UserLeaveEntitlementDbService } from 'src/api/userprofile/db/user-leave-entitlement.db.service';
import { LeavetypeEntitlementDbService } from 'src/admin/leavetype-entitlement/db/leavetype-entitlement.db.service';

/**
 * Db service for report
 *
 * @export
 * @class ReportDBService
 */
@Injectable()
export class ReportDBService {
  /**
   *Creates an instance of ReportDBService.
   * @param {UserLeaveEntitlementSummaryDbService} userLeaveEntitlementSummary user leave entitlement summary db service
   * @param {LeaveTransactionDbService} leaveTransactionDbService leave transaction db service
   * @param {UserprofileDbService} userprofileDbService user profile db service
   * @param {LeaveAdjustmentDbLogService} leaveAdjustmentLogDbService leave adjustment db log service
   * @param {LeaveTransactionLogDbService} leaveTransactionLogDbService leave transaction log db service
   * @param {UserLeaveEntitlementDbService} userLeaveEntitlementDbService user Leave Entitlement Db Service
   * @memberof ReportDBService
   */
  constructor(
    public userLeaveEntitlementSummary: UserLeaveEntitlementSummaryDbService,
    public leaveTransactionDbService: LeaveTransactionDbService,
    public userprofileDbService: UserprofileDbService,
    public leaveAdjustmentLogDbService: LeaveAdjustmentDbLogService,
    public leaveTransactionLogDbService: LeaveTransactionLogDbService,
    public userLeaveEntitlementDbService: UserLeaveEntitlementDbService,
    public leaveEntitlementDbService: LeavetypeEntitlementDbService
  ) { }
}