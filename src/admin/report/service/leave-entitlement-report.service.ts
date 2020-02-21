import { Injectable } from '@nestjs/common';
import { LeaveEntitlementReportDto, LeaveDetailsDto } from '../dto/leave-entitlement-report.dto';
import { Observable } from 'rxjs';
import { ReportDBService } from './report-db.service';
import { map, mergeMap } from 'rxjs/operators';
import { PendingLeaveService } from 'src/admin/approval-override/pending-leave.service';

@Injectable()
export class LeaveEntitlementReportService {
  constructor(
    private readonly reportDBService: ReportDBService,
    private readonly pendingLeaveService: PendingLeaveService
  ) { }
  getLeaveEntitlementData([tenantId, userId]: [string, string]): Observable<any> {
    let filter = [`(TENANT_GUID=${tenantId})`, `(YEAR=${new Date().getFullYear()})`];
    const extra = ['(USER_GUID=' + userId + ')'];
    filter = userId != null ? filter.concat(extra) : filter;
    return this.reportDBService.userLeaveEntitlementSummary.findByFilterV2([], filter).pipe(
      mergeMap(async res => {
        let leaveTypeList = await this.pendingLeaveService.getLeavetypeList(res[0].TENANT_GUID);
        let resultAll = await this.pendingLeaveService.getAllUserInfo(res[0].TENANT_GUID) as any[];

        return { res, leaveTypeList, resultAll };
      }),
      map(result => {
        let { res, leaveTypeList, resultAll } = result;
        let userIdList = [];

        res.forEach(async element => {
          const userId = userIdList.find(x => (x.userGuid == element.USER_GUID));
          let resultUser = resultAll.find(x => x.USER_GUID === element.USER_GUID);

          if (!userId) {
            let leaveEntitlementReportDTO = new LeaveEntitlementReportDto;
            leaveEntitlementReportDTO.userGuid = element.USER_GUID;
            leaveEntitlementReportDTO.employeeNo = resultUser.STAFF_ID;
            leaveEntitlementReportDTO.employeeName = resultUser.FULLNAME;
            leaveEntitlementReportDTO.yearService = 1;

            const leaveData = this.assignData([element, leaveTypeList]);

            leaveEntitlementReportDTO.leaveDetail = [];
            leaveEntitlementReportDTO.leaveDetail.push(leaveData);
            userIdList.push(leaveEntitlementReportDTO);

          } else {
            const leaveData = this.assignData([element, leaveTypeList]);
            userId.leaveDetail.push(leaveData);
          }

        });

        return userIdList;

      }), map(res => {
        return res;
      })
    );


  }

  assignData([element, leaveTypeList]) {
    // merge leave for user 
    const leaveData = new LeaveDetailsDto;
    let findLeaveData = leaveTypeList.find(x => x.LEAVE_TYPE_GUID === element.LEAVE_TYPE_GUID);

    leaveData.leaveType = findLeaveData.CODE;
    leaveData.entitledDays = element.ENTITLED_DAYS;
    leaveData.carriedForward = 2;
    leaveData.forfeited = '12';
    leaveData.taken = element.TOTAL_APPROVED;
    leaveData.pending = element.TOTAL_PENDING;
    leaveData.balance = element.BALANCE_DAYS;
    return leaveData;
  }

}