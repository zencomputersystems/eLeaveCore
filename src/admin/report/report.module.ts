import { Module } from '@nestjs/common';
import { getModuleHttp } from '../../common/helper/basic-functions';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { LeaveEntitlementReportService } from './service/leave-entitlement-report.service';
import { ReportDBService } from './service/report-db.service';
import { UserLeaveEntitlementSummaryDbService } from 'src/api/userprofile/db/user-leave-summary.db.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { ApprovalOverrideReportService } from './service/approval-override-report.service';
import { LeaveTransactionDbService } from 'src/api/leave/db/leave-transaction.db.service';
import { DateCalculationService } from 'src/common/calculation/service/date-calculation.service';
import { ApplyOnBehalfReportService } from './service/apply-on-behalf-report.service';
import { LeaveTakenReportService } from './service/leave-taken-report.service';
import { LeaveRejectReportService } from './service/leave-reject-report.service';
import { LeaveCancelReportService } from './service/leave-cancel-report.service';
import { MasterListReportService } from './service/master-list-report.service';
import { UserprofileDbService } from '../../api/userprofile/db/userprofile.db.service';
import { EntitlementClaimReportService } from './service/entitlement-claim-report.service';
import { LeaveAdjustmentReportService } from './service/leave-adjustment-report.service';
import { LeaveForfeitedReportService } from './service/leave-forfeited-report.service';
import { PendingLeaveService } from '../approval-override/pending-leave.service';
import { CompanyDbService } from '../company/company.service';
import { LeavetypeService } from '../leavetype/leavetype.service';
import { LeaveAdjustmentDbLogService } from '../leave-adjustment/leave-adjustment-log.service';
import { LeaveTransactionLogDbService } from 'src/api/leave/db/leave-transaction-log.db.service';

@Module({
  imports: [
    getModuleHttp()
  ],
  providers: [
    ReportService,
    LeaveEntitlementReportService,
    ApprovalOverrideReportService,
    ApplyOnBehalfReportService,
    LeaveTakenReportService,
    LeaveRejectReportService,
    LeaveCancelReportService,
    MasterListReportService,
    EntitlementClaimReportService,
    LeaveAdjustmentReportService,
    LeaveForfeitedReportService,
    PendingLeaveService,

    CompanyDbService,
    LeavetypeService,

    ReportDBService,
    UserLeaveEntitlementSummaryDbService,
    LeaveTransactionDbService,
    UserprofileDbService,
    LeaveAdjustmentDbLogService,
    LeaveTransactionLogDbService,

    QueryParserService,
    DateCalculationService
  ],
  controllers: [
    ReportController
  ]
})
export class ReportModule { }