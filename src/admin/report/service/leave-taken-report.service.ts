import { Injectable } from '@nestjs/common';
import { ReportDBService } from './report-db.service';
import { map, filter, mergeMap } from 'rxjs/operators';
import { LeaveTakenReportDto, LeaveTakenDetailsDto } from '../dto/leave-taken-report.dto';
import { PendingLeaveService } from 'src/admin/approval-override/pending-leave.service';

@Injectable()
export class LeaveTakenReportService {
  constructor(private readonly reportDBService: ReportDBService,
    private readonly pendingLeaveService: PendingLeaveService) { }
  getLeaveTakenData([tenantId, userId]: [string, string]) {
    let filter = [`(TENANT_GUID=${tenantId})`, `(STATUS=APPROVED)`];
    const extra = ['(USER_GUID=' + userId + ')'];
    filter = userId != null ? filter.concat(extra) : filter;

    return this.reportDBService.leaveTransactionDbService.findByFilterV2([], filter).pipe(
      mergeMap(async res => {
        let leaveTypeList = await this.pendingLeaveService.getLeavetypeList(res[0].TENANT_GUID) as any[];
        let resultAll = await this.pendingLeaveService.getAllUserInfo(res[0].TENANT_GUID) as any[];
        return { res, leaveTypeList, resultAll };

      }),
      map(result => {
        let userIdList = [];
        let { res, leaveTypeList, resultAll } = result;
        res.forEach(element => {
          const userId = userIdList.find(x => (x.userGuid == element.USER_GUID));
          let resultUser = resultAll.find(x => x.USER_GUID === element.USER_GUID);

          if (!userId) {
            // combine all id for filter
            let leaveTakenReportDTO = new LeaveTakenReportDto;

            leaveTakenReportDTO.userGuid = element.USER_GUID;
            leaveTakenReportDTO.employeeNo = resultUser.STAFF_ID;
            leaveTakenReportDTO.employeeName = resultUser.FULLNAME;

            const leaveData = this.runService([element, leaveTypeList])

            leaveTakenReportDTO.leaveDetail = [];
            leaveTakenReportDTO.leaveDetail.push(leaveData);

            userIdList.push(leaveTakenReportDTO);

          } else {
            const leaveData = this.runService(element);

            userId.leaveDetail.push(leaveData);
          }

        });
        return userIdList;
      }),
      map(res => {
        return res;
      })
    );
  }

  runService([element, leaveTypeList]) {
    let findLeaveData = leaveTypeList.find(x => x.LEAVE_TYPE_GUID === element.LEAVE_TYPE_GUID);

    // merge leave for user 
    const leaveData = new LeaveTakenDetailsDto;
    leaveData.leaveTypeId = element.LEAVE_TYPE_GUID;
    leaveData.leaveTypeName = findLeaveData.CODE;
    leaveData.startDate = element.START_DATE;
    leaveData.endDate = element.END_DATE;
    leaveData.noOfDays = element.NO_OF_DAYS;
    leaveData.approveBy = element.STATES != undefined ? JSON.parse(element.STATES) : [];
    leaveData.remarks = element.REMARKS
    return leaveData;
  }
}