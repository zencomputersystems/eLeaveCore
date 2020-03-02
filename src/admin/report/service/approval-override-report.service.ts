import { Injectable } from '@nestjs/common';
import { of, Observable } from 'rxjs';
import { ReportDBService } from './report-db.service';
import { ApprovalOverrideReportDto } from '../dto/approval-override-report.dto';
import { PendingLeaveService } from 'src/admin/approval-override/pending-leave.service';
import { mergeMap, map, flatMap } from 'rxjs/operators';

@Injectable()
export class ApprovalOverrideReportService {
  constructor(
    private readonly reportDBService: ReportDBService,
    private readonly pendingLeaveService: PendingLeaveService
  ) { }
  getApprovalOverrideData([tenantId, userId]: [string, string]) {
    let filter = [`(TENANT_GUID=${tenantId})`, `(PROCESS=APPROVAL_OVERRIDE)`];
    const extra = ['(USER_GUID=' + userId + ')'];
    filter = userId != null ? filter.concat(extra) : filter;

    return this.reportDBService.leaveTransactionLogDbService.findByFilterV2([], filter).pipe(
      mergeMap(async res => {
        // Get leavetype list
        let leaveTypeList = await this.pendingLeaveService.getLeavetypeList(res[0].TENANT_GUID) as any[];
        // Get user info details
        let resultAll = await this.pendingLeaveService.getAllUserInfo(res[0].TENANT_GUID) as any[];
        // Group leave transactionId
        let transactionId = [];
        res.forEach(x => { transactionId.push(x.LEAVE_TRANSACTION_GUID); });
        // Find leavetransactionId data by id group
        let filter = [`(LEAVE_TRANSACTION_GUID IN (${transactionId}))`];
        let method = this.reportDBService.leaveTransactionDbService.findByFilterV2([], filter);
        let leaveData = await this.pendingLeaveService.runService(method) as any[];
        // Return transactionLog, leavetypeList, userinfoDetails, and leaveTransactionData
        return { res, leaveTypeList, resultAll, leaveData };
      }),
      map(result => {
        let { res, leaveTypeList, resultAll, leaveData } = result;
        let approvalOverrideData = [];
        // Loop leave transaction data by log
        res.forEach(element => {
          // Find leave transaction data by leave transaction guid
          let getLeaveInfo = leaveData.find(x => x.LEAVE_TRANSACTION_GUID === element.LEAVE_TRANSACTION_GUID);
          // Get user info from user guid from leave transactoin data
          let resultUser = resultAll.find(x => x.USER_GUID === getLeaveInfo.USER_GUID);
          // Get creator data
          let resultCreator = resultAll.find(x => x.USER_GUID === element.CREATION_USER_GUID);
          // Get leavetype info by leave type guid
          let findLeaveData = leaveTypeList.find(x => x.LEAVE_TYPE_GUID === getLeaveInfo.LEAVE_TYPE_GUID);

          // Setup approval override report
          let approvalOverrideReportDto = new ApprovalOverrideReportDto;

          approvalOverrideReportDto.userGuid = getLeaveInfo.USER_GUID;
          approvalOverrideReportDto.employeeNo = resultUser.STAFF_ID;
          approvalOverrideReportDto.employeeName = resultUser.FULLNAME;
          approvalOverrideReportDto.leaveTypeId = element.LEAVE_TYPE_GUID;
          approvalOverrideReportDto.leaveTypeName = findLeaveData.CODE;
          approvalOverrideReportDto.applicationDate = getLeaveInfo.CREATION_TS;
          approvalOverrideReportDto.overrideBy = resultCreator.FULLNAME;
          approvalOverrideReportDto.overrideDate = element.CREATION_TS;
          approvalOverrideReportDto.startDate = getLeaveInfo.START_DATE;
          approvalOverrideReportDto.endDate = getLeaveInfo.END_DATE;
          approvalOverrideReportDto.noOfDays = getLeaveInfo.NO_OF_DAYS;
          approvalOverrideReportDto.status = element.STATUS;
          approvalOverrideReportDto.remarks = element.REMARKS;

          approvalOverrideData.push(approvalOverrideReportDto);

        });

        approvalOverrideData.sort((a, b) => (a.applicationDate > b.applicationDate) ? 1 : ((b.applicationDate > a.applicationDate) ? -1 : 0));

        return approvalOverrideData;
      })
    );


  }
}