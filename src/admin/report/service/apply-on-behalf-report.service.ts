import { Injectable } from '@nestjs/common';
import { ReportDBService } from './report-db.service';
import { map } from 'rxjs/operators';
import { ApplyOnBehalfReportDto } from '../dto/apply-on-behalf-report.dto';

@Injectable()
export class ApplyOnBehalfReportService {
  constructor(private readonly reportDBService: ReportDBService) { }
  getApplyOnBehalfData([tenantId]: [string]) {
    return this.reportDBService.leaveTransactionDbService.findByFilterV2([], [`(APPLIED_ON_BEHALF=1)`, `(TENANT_GUID=${tenantId})`]).pipe(
      map(res => {
        let userIdList = [];
        res.forEach(element => {
          let applyOnBehalfReportDto = new ApplyOnBehalfReportDto;

          applyOnBehalfReportDto.userGuid = element.USER_GUID;
          applyOnBehalfReportDto.employeeNo = 'wf';
          applyOnBehalfReportDto.employeeName = 'dw';
          applyOnBehalfReportDto.yearService = 2;
          applyOnBehalfReportDto.leaveType = element.LEAVE_TYPE_GUID;
          applyOnBehalfReportDto.applicationDate = element.CREATION_TS;
          applyOnBehalfReportDto.confirmedDate = element.UPDATE_TS;
          applyOnBehalfReportDto.appliedBy = element.UPDATE_USER_GUID;
          applyOnBehalfReportDto.startDate = element.START_DATE;
          applyOnBehalfReportDto.endDate = element.END_DATE;
          applyOnBehalfReportDto.noOfDays = element.NO_OF_DAYS;
          applyOnBehalfReportDto.status = element.STATUS;
          applyOnBehalfReportDto.remarks = element.REMARKS;

          userIdList.push(applyOnBehalfReportDto);
        });

        return userIdList;
      })
    )
  }
}