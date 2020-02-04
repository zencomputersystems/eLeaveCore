import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';

@Injectable()
export class LeaveAdjustmentReportService {
  getLeaveAdjustmentData([tenantId, userId]: [string, string]) {
    return of(tenantId);
  }
}