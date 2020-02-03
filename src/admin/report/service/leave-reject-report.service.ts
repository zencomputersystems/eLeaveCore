import { Injectable } from '@nestjs/common';
import { ReportDBService } from './report-db.service';
import { map } from 'rxjs/operators';
import { LeaveRejectReportDto } from '../dto/leave-reject-report.dto';

@Injectable()
export class LeaveRejectReportService {
  constructor(private readonly reportDBService: ReportDBService) { }

  getLeaveRejectData([tenantId]: [string]) {

    return this.reportDBService.leaveTransactionDbService.findByFilterV2([], [`(TENANT_GUID=${tenantId})`, `(STATUS=REJECTED)`]).pipe(
      map(res => {
        let userIdList = [];
        res.forEach(element => {
          // const userId = userIdList.find(x => (x.userGuid == element.USER_GUID));
          // if (!userId) {
          // combine all id for filter
          // userIdList.push(element.USER_GUID);
          let leaveRejectReportDTO = new LeaveRejectReportDto;

          leaveRejectReportDTO.userGuid = element.USER_GUID;
          leaveRejectReportDTO.employeeNo = element.USER_GUID;
          leaveRejectReportDTO.employeeName = element.TENANT_GUID;

          // const leaveData = new LeaveTakenDetailsDto;
          // leaveData.leaveType = element.LEAVE_TYPE_GUID;
          // leaveData.startDate = element.START_DATE;
          // leaveData.endDate = element.END_DATE;
          // leaveData.noOfDays = element.NO_OF_DAYS;
          // leaveData.approveBy = element.STATES != undefined ? element.STATES : [];
          // leaveData.remarks = element.REMARKS;

          // leaveTakenReportDTO.leaveDetail = [];
          // leaveTakenReportDTO.leaveDetail.push(leaveData);
          leaveRejectReportDTO.leaveType = element.LEAVE_TYPE_GUID;
          leaveRejectReportDTO.startDate = element.START_DATE;
          leaveRejectReportDTO.endDate = element.END_DATE;
          leaveRejectReportDTO.noOfDays = element.NO_OF_DAYS;
          leaveRejectReportDTO.rejectBy = element.UPDATE_USER_GUID;
          leaveRejectReportDTO.remarks = element.REMARKS;

          userIdList.push(leaveRejectReportDTO);

          // } else {
          //   // merge leave for user 
          //   const leaveData = new LeaveTakenDetailsDto;
          //   leaveData.leaveType = element.LEAVE_TYPE_GUID;
          //   leaveData.startDate = element.START_DATE;
          //   leaveData.endDate = element.END_DATE;
          //   leaveData.noOfDays = element.NO_OF_DAYS;
          //   leaveData.approveBy = element.STATES != undefined ? element.STATES : [];
          //   leaveData.remarks = element.REMARKS

          //   userId.leaveDetail.push(leaveData);
          // }
          // console.log(userIdList);
        });
        return userIdList;
      })
    );
  }
}
