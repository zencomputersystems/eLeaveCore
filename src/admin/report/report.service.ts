import { Injectable } from '@nestjs/common';
import { of, Observable } from 'rxjs';
import { LeaveEntitlementReportService } from './service/leave-entitlement-report.service';
import { ApprovalOverrideReportService } from './service/approval-override-report.service';
import { ApplyOnBehalfReportService } from './service/apply-on-behalf-report.service';
import { LeaveTakenReportService } from './service/leave-taken-report.service';
import { LeaveRejectReportService } from './service/leave-reject-report.service';
import { LeaveCancelReportService } from './service/leave-cancel-report.service';
import { MasterListReportService } from './service/master-list-report.service';

@Injectable()
export class ReportService {
  constructor(
    private readonly leaveEntitlementReportService: LeaveEntitlementReportService,
    private readonly approvalOverrideReportService: ApprovalOverrideReportService,
    private readonly applyOnBehalfReportService: ApplyOnBehalfReportService,
    private readonly leaveTakenReportService: LeaveTakenReportService,
    private readonly leaveRejectReportService: LeaveRejectReportService,
    private readonly leaveCancelReportService: LeaveCancelReportService,
    private readonly masterListReportService: MasterListReportService
  ) { }
  getReport([typeReport, tenantId]: [string, string]): Observable<any> {
    if (typeReport == 'leave-entitlement') {
      // data not complete yet
      return this.leaveEntitlementReportService.getData([tenantId]);
    } else if (typeReport == 'approval-override') {
      // cant query yet
      return this.approvalOverrideReportService.getDataApprovalOverride([tenantId]);
    } else if (typeReport == 'apply-on-behalf') {
      return this.applyOnBehalfReportService.getDataApplyOnBehalf([tenantId]);
    } else if (typeReport == 'leave-taken') {
      return this.leaveTakenReportService.getLeaveTakenData([tenantId]);
    } else if (typeReport == 'leave-rejected') {
      return this.leaveRejectReportService.getLeaveRejectData([tenantId]);
    } else if (typeReport == 'leave-cancellation') {
      return this.leaveCancelReportService.getLeaveCancelData([tenantId]);
    } else if (typeReport == 'employee-master-list') {
      return this.masterListReportService.getMasterListData([tenantId]);
    }
    return of(typeReport);
  }
}