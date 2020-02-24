import { Injectable } from '@nestjs/common';
import { ReportDBService } from './report-db.service';
import { map } from 'rxjs/operators';
import { LeaveRejectReportDto } from '../dto/leave-reject-report.dto';

@Injectable()
export class LeaveRejectReportService {
  constructor(private readonly reportDBService: ReportDBService) { }

  getLeaveRejectData([tenantId, userId]: [string, string]) {
    let filter = [`(TENANT_GUID=${tenantId})`, `(STATUS=REJECTED)`];
    const extra = ['(USER_GUID=' + userId + ')'];
    filter = userId != null ? filter.concat(extra) : filter;

    return this.reportDBService.leaveTransactionDbService.findByFilterV2([], filter).pipe(
      map(res => {
        let userIdList = [];
        res.forEach(element => {
          let leaveRejectReportDTO = new LeaveRejectReportDto;

          leaveRejectReportDTO.userGuid = element.USER_GUID;
          leaveRejectReportDTO.employeeNo = element.USER_GUID;
          leaveRejectReportDTO.employeeName = element.TENANT_GUID;
          leaveRejectReportDTO.leaveTypeId = element.LEAVE_TYPE_GUID;
          leaveRejectReportDTO.leaveTypeName = '';
          leaveRejectReportDTO.startDate = element.START_DATE;
          leaveRejectReportDTO.endDate = element.END_DATE;
          leaveRejectReportDTO.noOfDays = element.NO_OF_DAYS;
          leaveRejectReportDTO.rejectBy = element.UPDATE_USER_GUID;
          leaveRejectReportDTO.remarks = element.REMARKS;

          userIdList.push(leaveRejectReportDTO);

        });
        return userIdList;
      })
    );
  }
}
