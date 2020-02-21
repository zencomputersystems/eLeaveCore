import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';
import { ReportDBService } from './report-db.service';

@Injectable()
export class ApprovalOverrideReportService {
  constructor(private readonly reportDBService: ReportDBService) { }
  getApprovalOverrideData([tenantId, userId]: [string, string]) {
    return of(tenantId);
  }
}