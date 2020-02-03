import { Injectable } from '@nestjs/common';
import { ReportDBService } from './report-db.service';
import { LeaveCancelReportDto } from '../dto/leave-cancel-report.dto';
import { map } from 'rxjs/operators';

@Injectable()
export class LeaveCancelReportService {
  constructor(private readonly reportDBService: ReportDBService) { }
  getLeaveCancelData([tenantId]: [string]) {

    return this.reportDBService.leaveTransactionDbService.findByFilterV2([], [`(TENANT_GUID=${tenantId})`, `(STATUS=CANCELLED)`]).pipe(
      map(res => {
        let userIdList = [];
        res.forEach(element => {
          let leaveRejectReportDTO = new LeaveCancelReportDto;

          leaveRejectReportDTO.userGuid = element.USER_GUID;
          leaveRejectReportDTO.employeeNo = element.USER_GUID;
          leaveRejectReportDTO.employeeName = element.TENANT_GUID;
          leaveRejectReportDTO.leaveType = element.LEAVE_TYPE_GUID;
          leaveRejectReportDTO.startDate = element.START_DATE;
          leaveRejectReportDTO.endDate = element.END_DATE;
          leaveRejectReportDTO.noOfDays = element.NO_OF_DAYS;
          leaveRejectReportDTO.cancelBy = element.UPDATE_USER_GUID;
          leaveRejectReportDTO.leaveRemarks = element.REMARKS;
          leaveRejectReportDTO.cancelRemarks = element.REASON;

          userIdList.push(leaveRejectReportDTO);
        });
        return userIdList;
      })
    );
  }
}