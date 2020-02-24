import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';
import { ReportDBService } from './report-db.service';
import { ApprovalOverrideReportDto } from '../dto/approval-override-report.dto';

@Injectable()
export class ApprovalOverrideReportService {
  constructor(private readonly reportDBService: ReportDBService) { }
  getApprovalOverrideData([tenantId, userId]: [string, string]) {
    let approvalOverrideReportDto = new ApprovalOverrideReportDto;
    let approvalOverrideData = [];

    approvalOverrideReportDto.userGuid = '';
    approvalOverrideReportDto.employeeNo = '';
    approvalOverrideReportDto.employeeName = '';
    approvalOverrideReportDto.leaveTypeId = '';
    approvalOverrideReportDto.leaveTypeName = '';
    approvalOverrideReportDto.applicationDate = '';
    approvalOverrideReportDto.overrideBy = '';
    approvalOverrideReportDto.overrideDate = '';
    approvalOverrideReportDto.startDate = '';
    approvalOverrideReportDto.endDate = '';
    approvalOverrideReportDto.noOfDays = '';
    approvalOverrideReportDto.status = '';
    approvalOverrideReportDto.remarks = '';

    approvalOverrideData.push(approvalOverrideReportDto);

    return of(approvalOverrideData);
  }
}