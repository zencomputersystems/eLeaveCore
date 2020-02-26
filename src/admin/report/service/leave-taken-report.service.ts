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
        // console.log(res);
        let leaveTypeList = await this.pendingLeaveService.getLeavetypeList(res[0].TENANT_GUID) as any[];
        let resultAll = await this.pendingLeaveService.getAllUserInfo(res[0].TENANT_GUID) as any[];
        return { res, leaveTypeList, resultAll };
        // return res;
      }),
      map(result => {
        let userIdList = [];
        let { res, leaveTypeList, resultAll } = result;
        // let res = result;
        res.forEach(element => {
          // console.log(element);
          // console.log(userIdList);
          const userId = userIdList.find(x => (x.userGuid == element.USER_GUID));
          let resultUser = resultAll.find(x => x.USER_GUID === element.USER_GUID);
          // console.log(userId);
          // // console.log(resultUser);

          if (!userId) {
            //   // combine all id for filter
            let leaveTakenReportDTO = new LeaveTakenReportDto;

            leaveTakenReportDTO.userGuid = element.USER_GUID;
            leaveTakenReportDTO.employeeNo = resultUser.STAFF_ID;
            leaveTakenReportDTO.employeeName = resultUser.FULLNAME;
            // const leaveData = new LeaveTakenDetailsDto;
            const leaveData = this.runService([element, leaveTypeList]);
            //   // console.log('a');
            leaveTakenReportDTO.leaveDetail = [];
            leaveTakenReportDTO.leaveDetail.push(leaveData);
            //   // console.log(leaveTakenReportDTO);
            userIdList.push(leaveTakenReportDTO);

          } else {
            // console.log(element.USER_GUID + '-' + element.LEAVE_TYPE_GUID);
            const leaveData = this.runService([element, leaveTypeList]);

            // console.log(leaveData);
            userId.leaveDetail.push(leaveData);
          }
          // // console.log(userIdList);

        });
        // console.log(userIdList);
        return userIdList;
        // return result
      }),
      // map(res => {
      //   console.log(res);
      //   return res;
      // })
    );
  }

  runService([element, leaveTypeList]) {
    // console.log(element.LEAVE_TYPE_GUID);
    let findLeaveData = leaveTypeList.find(x => x.LEAVE_TYPE_GUID === element.LEAVE_TYPE_GUID);
    // console.log(element.STATES);
    // const approverList = element.STATES != null ? JSON.parse(element.STATES) : [];
    // console.log(approverList);
    // merge leave for user 
    const leaveData = new LeaveTakenDetailsDto;
    leaveData.leaveTypeId = element.LEAVE_TYPE_GUID;
    leaveData.leaveTypeName = findLeaveData.CODE;
    leaveData.startDate = element.START_DATE;
    leaveData.endDate = element.END_DATE;
    leaveData.noOfDays = element.NO_OF_DAYS;
    leaveData.approveBy = element.STATES != null ? JSON.parse(element.STATES) : [];
    leaveData.remarks = element.REMARKS
    return leaveData;
  }
}