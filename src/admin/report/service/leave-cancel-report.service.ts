import { Injectable } from '@nestjs/common';
import { ReportDBService } from './report-db.service';
import { LeaveCancelReportDto } from '../dto/leave-cancel-report.dto';
import { map, mergeMap } from 'rxjs/operators';
import { PendingLeaveService } from 'src/admin/approval-override/pending-leave.service';

/**
 * Leave cancel report service
 *
 * @export
 * @class LeaveCancelReportService
 */
@Injectable()
export class LeaveCancelReportService {
  /**
   *Creates an instance of LeaveCancelReportService.
   * @param {ReportDBService} reportDBService
   * @param {PendingLeaveService} pendingLeaveService
   * @memberof LeaveCancelReportService
   */
  constructor(
    private readonly reportDBService: ReportDBService,
    private readonly pendingLeaveService: PendingLeaveService
  ) { }
  /**
   * Get leave cancellation data
   *
   * @param {[string, string]} [tenantId, userId]
   * @returns
   * @memberof LeaveCancelReportService
   */
  getLeaveCancelData([tenantId, userId]: [string, string]) {
    let filter = [`(TENANT_GUID=${tenantId})`, `(STATUS=CANCELLED)`];
    const extra = ['(USER_GUID=' + userId + ')'];
    filter = userId != null ? filter.concat(extra) : filter;

    return this.reportDBService.leaveTransactionDbService.findByFilterV2([], filter).pipe(
      mergeMap(async res => {
        // console.log(res);
        let leaveTypeList = await this.pendingLeaveService.getLeavetypeList(res[0].TENANT_GUID) as any[];
        let resultAll = await this.pendingLeaveService.getAllUserInfo(res[0].TENANT_GUID) as any[];

        return { res, leaveTypeList, resultAll };
      }),
      map(result => {
        let { res, leaveTypeList, resultAll } = result;
        let userIdList = [];
        res.forEach(element => {
          let resultUser = resultAll.find(x => x.USER_GUID === element.USER_GUID);

          let resultCreator = resultAll.find(x => x.USER_GUID === element.UPDATE_USER_GUID);

          let findLeaveData = leaveTypeList.find(x => x.LEAVE_TYPE_GUID === element.LEAVE_TYPE_GUID);

          let leaveRejectReportDTO = new LeaveCancelReportDto;

          leaveRejectReportDTO.userGuid = element.USER_GUID;
          leaveRejectReportDTO.employeeNo = resultUser.STAFF_ID;
          leaveRejectReportDTO.employeeName = resultUser.FULLNAME;
          leaveRejectReportDTO.leaveTypeId = element.LEAVE_TYPE_GUID;
          leaveRejectReportDTO.leaveTypeName = findLeaveData.CODE;
          leaveRejectReportDTO.startDate = element.START_DATE;
          leaveRejectReportDTO.endDate = element.END_DATE;
          leaveRejectReportDTO.noOfDays = element.NO_OF_DAYS;
          leaveRejectReportDTO.cancelBy = resultCreator.FULLNAME;
          leaveRejectReportDTO.leaveRemarks = element.REMARKS;
          leaveRejectReportDTO.cancelRemarks = element.REASON;

          userIdList.push(leaveRejectReportDTO);
        });
        return userIdList;
      })
    );
  }
}