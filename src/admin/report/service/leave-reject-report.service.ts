import { Injectable } from '@nestjs/common';
import { ReportDBService } from './report-db.service';
import { map, mergeMap } from 'rxjs/operators';
import { LeaveRejectReportDto } from '../dto/leave-reject-report.dto';
import { PendingLeaveService } from 'src/admin/approval-override/pending-leave.service';

/**
 * Leave reject report service
 *
 * @export
 * @class LeaveRejectReportService
 */
@Injectable()
export class LeaveRejectReportService {
  /**
   *Creates an instance of LeaveRejectReportService.
   * @param {ReportDBService} reportDBService
   * @param {PendingLeaveService} pendingLeaveService
   * @memberof LeaveRejectReportService
   */
  constructor(
    private readonly reportDBService: ReportDBService,
    private readonly pendingLeaveService: PendingLeaveService
  ) { }

  /**
   * Get leave reject data
   *
   * @param {[string, string]} [tenantId, userId]
   * @returns
   * @memberof LeaveRejectReportService
   */
  getLeaveRejectData([tenantId, userId]: [string, string]) {
    let filter = [`(TENANT_GUID=${tenantId})`, `(STATUS=REJECTED)`];
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

          let leaveRejectReportDTO = new LeaveRejectReportDto;

          leaveRejectReportDTO.userGuid = element.USER_GUID;
          leaveRejectReportDTO.employeeNo = resultUser.STAFF_ID;
          leaveRejectReportDTO.employeeName = resultUser.FULLNAME;
          leaveRejectReportDTO.leaveTypeId = element.LEAVE_TYPE_GUID;
          leaveRejectReportDTO.leaveTypeName = findLeaveData.CODE;
          leaveRejectReportDTO.startDate = element.START_DATE;
          leaveRejectReportDTO.endDate = element.END_DATE;
          leaveRejectReportDTO.noOfDays = element.NO_OF_DAYS;
          leaveRejectReportDTO.rejectBy = resultCreator.FULLNAME;
          leaveRejectReportDTO.leaveRemarks = element.REMARKS;
          leaveRejectReportDTO.rejectRemarks = element.REASON;

          userIdList.push(leaveRejectReportDTO);

        });
        return userIdList;
      })
    );
  }
}
