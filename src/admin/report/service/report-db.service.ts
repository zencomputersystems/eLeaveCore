import { Injectable } from '@nestjs/common';
import { UserLeaveEntitlementSummaryDbService } from 'src/api/userprofile/db/user-leave-summary.db.service';
import { LeaveTransactionDbService } from 'src/api/leave/db/leave-transaction.db.service';
import { UserprofileDbService } from 'src/api/userprofile/db/userprofile.db.service';

@Injectable()
export class ReportDBService {
  constructor(
    public userLeaveEntitlementSummary: UserLeaveEntitlementSummaryDbService,
    public leaveTransactionDbService: LeaveTransactionDbService,
    public userprofileDbService: UserprofileDbService
  ) { }
}