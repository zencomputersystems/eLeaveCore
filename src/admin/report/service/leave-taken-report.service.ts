import { Injectable } from '@nestjs/common';
import { ReportDBService } from './report-db.service';
import { map } from 'rxjs/operators';
import { LeaveTakenReportDto, LeaveTakenDetailsDto } from '../dto/leave-taken-report.dto';

@Injectable()
export class LeaveTakenReportService {
  constructor(private readonly reportDBService: ReportDBService) { }
  getLeaveTakenData([tenantId]: [string]) {
    return this.reportDBService.leaveTransactionDbService.findByFilterV2([], [`(TENANT_GUID=${tenantId})`, `(STATUS=APPROVED)`]).pipe(
      map(res => {
        let userIdList = [];
        res.forEach(element => {
          const userId = userIdList.find(x => (x.userGuid == element.USER_GUID));
          if (!userId) {
            // combine all id for filter
            // userIdList.push(element.USER_GUID);
            let leaveTakenReportDTO = new LeaveTakenReportDto;

            leaveTakenReportDTO.userGuid = element.USER_GUID;
            leaveTakenReportDTO.employeeNo = element.USER_GUID;
            leaveTakenReportDTO.employeeName = element.TENANT_GUID;

            const leaveData = new LeaveTakenDetailsDto;
            leaveData.leaveType = element.LEAVE_TYPE_GUID;
            leaveData.startDate = element.START_DATE;
            leaveData.endDate = element.END_DATE;
            leaveData.noOfDays = element.NO_OF_DAYS;
            leaveData.approveBy = element.STATES != undefined ? element.STATES : [];
            leaveData.remarks = element.REMARKS;

            leaveTakenReportDTO.leaveDetail = [];
            leaveTakenReportDTO.leaveDetail.push(leaveData);

            userIdList.push(leaveTakenReportDTO);

          } else {
            // merge leave for user 
            const leaveData = new LeaveTakenDetailsDto;
            leaveData.leaveType = element.LEAVE_TYPE_GUID;
            leaveData.startDate = element.START_DATE;
            leaveData.endDate = element.END_DATE;
            leaveData.noOfDays = element.NO_OF_DAYS;
            leaveData.approveBy = element.STATES != undefined ? element.STATES : [];
            leaveData.remarks = element.REMARKS

            userId.leaveDetail.push(leaveData);
          }
          // console.log(userIdList);
        });
        return userIdList;
      })
    );
  }
}