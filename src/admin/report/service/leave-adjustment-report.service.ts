import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';
import { LeaveAdjustmentReportDto } from '../dto/leave-adjustment-report.dto';

@Injectable()
export class LeaveAdjustmentReportService {
  getLeaveAdjustmentData([tenantId, userId]: [string, string]) {
    let leaveAdjustmentReportDto = new LeaveAdjustmentReportDto;

    let leaveAdjustmentData = [];

    leaveAdjustmentReportDto.userGuid = '';
    leaveAdjustmentReportDto.employeeNo = '';
    leaveAdjustmentReportDto.employeeName = '';
    leaveAdjustmentReportDto.leaveType = '';
    leaveAdjustmentReportDto.adjustment = '';
    leaveAdjustmentReportDto.adjustBy = '';
    leaveAdjustmentReportDto.adjustDate = '';
    leaveAdjustmentReportDto.remarks = '';

    leaveAdjustmentData.push(leaveAdjustmentReportDto);

    return of(leaveAdjustmentData);
  }
}