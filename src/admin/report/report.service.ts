import { Injectable } from '@nestjs/common';
import { of, Observable } from 'rxjs';
import { LeaveEntitlementReportService } from './service/leave-entitlement-report.service';
import { ApprovalOverrideReportService } from './service/approval-override-report.service';
import { ApplyOnBehalfReportService } from './service/apply-on-behalf-report.service';
import { LeaveTakenReportService } from './service/leave-taken-report.service';
import { LeaveRejectReportService } from './service/leave-reject-report.service';
import { LeaveCancelReportService } from './service/leave-cancel-report.service';
import { MasterListReportService } from './service/master-list-report.service';
import { EntitlementClaimReportService } from './service/entitlement-claim-report.service';
import { LeaveAdjustmentReportService } from './service/leave-adjustment-report.service';
import { LeaveForfeitedReportService } from './service/leave-forfeited-report.service';

// export class ServiceListReport {
//   constructor([leaveEntitlementReport, approvalOverrideReport, applyOnBehalfReport, leaveTakenReport, leaveRejectReport, leaveCancelReport, masterListReport, entitlementClaimReport, leaveAdjustmentReport, leaveForfeitedReport]) {

//     this.leaveEntitlementReportService = leaveEntitlementReport;
//     this.approvalOverrideReportService = approvalOverrideReport;
//     this.applyOnBehalfReportService = applyOnBehalfReport;
//     this.leaveTakenReportService = leaveTakenReport;
//     this.leaveRejectReportService = leaveRejectReport;
//     this.leaveCancelReportService = leaveCancelReport;
//     this.masterListReportService = masterListReport;
//     this.entitlementClaimReportService = entitlementClaimReport;
//     this.leaveAdjustmentReportService = leaveAdjustmentReport;
//     this.leaveForfeitedReportService = leaveForfeitedReport;
//   }

//   public leaveEntitlementReportService: LeaveEntitlementReportService;
//   public approvalOverrideReportService: ApprovalOverrideReportService;
//   public applyOnBehalfReportService: ApplyOnBehalfReportService;
//   public leaveTakenReportService: LeaveTakenReportService;
//   public leaveRejectReportService: LeaveRejectReportService;
//   public leaveCancelReportService: LeaveCancelReportService;
//   public masterListReportService: MasterListReportService;
//   public entitlementClaimReportService: EntitlementClaimReportService;
//   public leaveAdjustmentReportService: LeaveAdjustmentReportService;
//   public leaveForfeitedReportService: LeaveForfeitedReportService;
// }

/**
 * Report service
 *
 * @export
 * @class ReportService
 */
@Injectable()
export class ReportService {
  /**
   *Creates an instance of ReportService.
   * @param {LeaveEntitlementReportService} leaveEntitlementReportService leave entitlement report service
   * @param {ApprovalOverrideReportService} approvalOverrideReportService approval override report service
   * @param {ApplyOnBehalfReportService} applyOnBehalfReportService apply on behalf report service
   * @param {LeaveTakenReportService} leaveTakenReportService leave taken report service
   * @param {LeaveRejectReportService} leaveRejectReportService leave reject report service
   * @param {LeaveCancelReportService} leaveCancelReportService leave cancellation report service
   * @param {MasterListReportService} masterListReportService master list report service
   * @param {EntitlementClaimReportService} entitlementClaimReportService entitlement claim report service
   * @param {LeaveAdjustmentReportService} leaveAdjustmentReportService leave adjustment report service
   * @param {LeaveForfeitedReportService} leaveForfeitedReportService leave forfeited report service
   * @memberof ReportService
   */
  constructor(
    public leaveEntitlementReportService: LeaveEntitlementReportService,
    public approvalOverrideReportService: ApprovalOverrideReportService,
    public applyOnBehalfReportService: ApplyOnBehalfReportService,
    public leaveTakenReportService: LeaveTakenReportService,
    public leaveRejectReportService: LeaveRejectReportService,
    public leaveCancelReportService: LeaveCancelReportService,
    public masterListReportService: MasterListReportService,
    public entitlementClaimReportService: EntitlementClaimReportService,
    public leaveAdjustmentReportService: LeaveAdjustmentReportService,
    public leaveForfeitedReportService: LeaveForfeitedReportService
  ) { }


  /* 
    'leave-entitlement',  - change data from id to exact value
    'approval-override',  - create table transaction log
    'apply-on-behalf',    - done
    'entitlement-claim',  - hold
    'leave-taken',        - create table transaction log
    'leave-adjustment',   - create table leave adjustment
    'leave-cancellation', - create table transaction log
    'leave-rejected',     - create table transaction log
    'forfeited-leave',    - run scheduler daily to store in table
    'employee-master-list'- done
  */

  /**
   * Get report
   *
   * @param {[string, string, string]} [typeReport, tenantId, userId]
   * @returns {Observable<any>}
   * @memberof ReportService
   */
  getReport([typeReport, tenantId, userId]: [string, string, string]): Observable<any> {
    const param: [string, string] = [tenantId, userId];

    const functionList = [
      { type: 'leave-entitlement', method: this.leaveEntitlementReportService.getLeaveEntitlementData(param) },
      { type: 'approval-override', method: this.approvalOverrideReportService.getApprovalOverrideData(param) },
      { type: 'apply-on-behalf', method: this.applyOnBehalfReportService.getApplyOnBehalfData(param) },
      { type: 'leave-taken', method: this.leaveTakenReportService.getLeaveTakenData(param) },
      { type: 'leave-rejected', method: this.leaveRejectReportService.getLeaveRejectData(param) },
      { type: 'leave-cancellation', method: this.leaveCancelReportService.getLeaveCancelData(param) },
      { type: 'employee-master-list', method: this.masterListReportService.getMasterListData(param) },
      { type: 'entitlement-claim', method: this.entitlementClaimReportService.getEntitlementClaimData(param) },
      { type: 'leave-adjustment', method: this.leaveAdjustmentReportService.getLeaveAdjustmentData(param) },
      { type: 'leave-forfeited', method: this.leaveForfeitedReportService.getLeaveForfeitedData(param) },
    ];

    const process = functionList.find(x => x.type === typeReport);
    console.log(process);
    const dataResult = process ? process.method : of(`Failed to process ${typeReport} right now.`);

    return dataResult;

    // if (typeReport == 'leave-entitlement') {
    //   // data not complete yet
    //   return this.leaveEntitlementReportService.getData([tenantId]);
    // } else if (typeReport == 'approval-override') {
    //   // cant query yet - asingkan table and refer transaction
    //   return this.approvalOverrideReportService.getDataApprovalOverride([tenantId]);
    // } else if (typeReport == 'apply-on-behalf') {
    //   return this.applyOnBehalfReportService.getDataApplyOnBehalf([tenantId]);
    // } else if (typeReport == 'leave-taken') {
    //   return this.leaveTakenReportService.getLeaveTakenData(param);
    // } else if (typeReport == 'leave-rejected') {
    //   return this.leaveRejectReportService.getLeaveRejectData(param);
    // } else if (typeReport == 'leave-cancellation') {
    //   return this.leaveCancelReportService.getLeaveCancelData(param);
    // } else if (typeReport == 'employee-master-list') {
    //   return this.masterListReportService.getMasterListData([tenantId]);
    // }

    // return of(typeReport);
  }
}