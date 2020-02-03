import { Injectable } from '@nestjs/common';
import { LeaveEntitlementReportDto, LeaveDetailsDto } from '../dto/leave-entitlement-report.dto';
import { of, Observable } from 'rxjs';
import { ReportDBService } from './report-db.service';
import { map, filter } from 'rxjs/operators';

@Injectable()
export class LeaveEntitlementReportService {
  constructor(private readonly reportDBService: ReportDBService) { }
  getData([tenantId]: [string]): Observable<any> {
    const filter = [`(TENANT_GUID=${tenantId})`, `(YEAR=${new Date().getFullYear()})`];
    return this.reportDBService.userLeaveEntitlementSummary.findByFilterV2([], filter).pipe(
      map(res => {
        // console.log(res);
        // let leaveEntitlementReportDTO = new LeaveEntitlementReportDto;
        // leaveEntitlementReportDTO.employeeName = 'wan faturrahman';
        // return leaveEntitlementReportDTO;
        let userIdList = [];

        res.forEach(element => {
          const userId = userIdList.find(x => (x.userGuid == element.USER_GUID));
          if (!userId) {
            // combine all id for filter
            // userIdList.push(element.USER_GUID);
            let leaveEntitlementReportDTO = new LeaveEntitlementReportDto;
            leaveEntitlementReportDTO.userGuid = element.USER_GUID;
            leaveEntitlementReportDTO.employeeNo = element.USER_GUID;
            leaveEntitlementReportDTO.employeeName = element.TENANT_GUID;
            leaveEntitlementReportDTO.yearService = 1;

            const leaveData = new LeaveDetailsDto;
            leaveData.leaveType = element.LEAVE_TYPE_GUID;
            leaveData.entitledDays = element.ENTITLED_DAYS;
            leaveData.carriedForward = 2;
            leaveData.forfeited = '12';
            leaveData.taken = element.TOTAL_APPROVED;
            leaveData.pending = element.TOTAL_PENDING;
            leaveData.balance = element.BALANCE_DAYS;

            leaveEntitlementReportDTO.leaveDetail = [];
            leaveEntitlementReportDTO.leaveDetail.push(leaveData);

            userIdList.push(leaveEntitlementReportDTO);

          } else {
            // merge leave for user 
            const leaveData = new LeaveDetailsDto;
            leaveData.leaveType = element.LEAVE_TYPE_GUID;
            leaveData.entitledDays = element.ENTITLED_DAYS;
            leaveData.carriedForward = 2;
            leaveData.forfeited = '12';
            leaveData.taken = element.TOTAL_APPROVED;
            leaveData.pending = element.TOTAL_PENDING;
            leaveData.balance = element.BALANCE_DAYS;

            console.log(userId);
            userId.leaveDetail.push(leaveData);
          }
          // console.log(userIdList);
        });

        // console.log(userIdList);
        return userIdList;
        // return res;
      }), map(res => {
        console.log(res);
        return res;
      })
    );


  }
}