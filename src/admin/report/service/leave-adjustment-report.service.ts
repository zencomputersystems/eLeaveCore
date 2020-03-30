import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';
import { LeaveAdjustmentReportDto } from '../dto/leave-adjustment-report.dto';
import { ReportDBService } from './report-db.service';
import { PendingLeaveService } from 'src/admin/approval-override/pending-leave.service';
import { mergeMap, map } from 'rxjs/operators';

/**
 * Leave adjustment report service
 *
 * @export
 * @class LeaveAdjustmentReportService
 */
@Injectable()
export class LeaveAdjustmentReportService {
  /**
   *Creates an instance of LeaveAdjustmentReportService.
   * @param {ReportDBService} reportDBService
   * @param {PendingLeaveService} pendingLeaveService
   * @memberof LeaveAdjustmentReportService
   */
  constructor(
    private readonly reportDBService: ReportDBService,
    private readonly pendingLeaveService: PendingLeaveService
  ) { }
  /**
   * Get leave adjustment data
   *
   * @param {[string, string]} [tenantId, userId]
   * @returns
   * @memberof LeaveAdjustmentReportService
   */
  getLeaveAdjustmentData([tenantId, userId]: [string, string]) {
    let filter = [`(TENANT_GUID=${tenantId})`];
    const extra = ['(USER_GUID=' + userId + ')'];
    filter = userId != null ? filter.concat(extra) : filter;

    return this.reportDBService.leaveAdjustmentLogDbService.findByFilterV2([], filter).pipe(
      mergeMap(async res => {
        // console.log(res);
        let leaveTypeList = await this.pendingLeaveService.getLeavetypeList(res[0].TENANT_GUID) as any[];
        let resultAll = await this.pendingLeaveService.getAllUserInfo(res[0].TENANT_GUID) as any[];

        return { res, leaveTypeList, resultAll };
      }),
      map(result => {
        let { res, leaveTypeList, resultAll } = result;
        let leaveAdjustmentData = [];

        res.forEach(element => {
          let resultUser = resultAll.find(x => x.USER_GUID === element.USER_GUID);

          let resultCreator = resultAll.find(x => x.USER_GUID === element.CREATION_USER_GUID);

          let findLeaveData = leaveTypeList.find(x => x.LEAVE_TYPE_GUID === element.LEAVE_TYPE_GUID);


          let leaveAdjustmentReportDto = new LeaveAdjustmentReportDto;
          leaveAdjustmentReportDto.userGuid = element.USER_GUID;
          leaveAdjustmentReportDto.employeeNo = resultUser.STAFF_ID;
          leaveAdjustmentReportDto.employeeName = resultUser.FULLNAME;
          leaveAdjustmentReportDto.leaveTypeId = element.LEAVE_TYPE_GUID;
          leaveAdjustmentReportDto.leaveTypeName = findLeaveData.CODE;
          leaveAdjustmentReportDto.leavetypeAbbr = findLeaveData.ABBR;
          leaveAdjustmentReportDto.adjustment = element.ADJUSTMENT;
          leaveAdjustmentReportDto.adjustBy = resultCreator.FULLNAME;
          leaveAdjustmentReportDto.adjustDate = element.CREATION_TS;
          leaveAdjustmentReportDto.remarks = element.REMAKRS;

          leaveAdjustmentReportDto.companyName = resultUser.COMPANY_NAME;
          leaveAdjustmentReportDto.department = resultUser.DEPARTMENT;
          leaveAdjustmentReportDto.costcentre = resultUser.COSTCENTRE;
          leaveAdjustmentReportDto.branch = resultUser.BRANCH;

          leaveAdjustmentData.push(leaveAdjustmentReportDto);

        });
        return leaveAdjustmentData;
      })
    );





    // return of(leaveAdjustmentData);
  }
}