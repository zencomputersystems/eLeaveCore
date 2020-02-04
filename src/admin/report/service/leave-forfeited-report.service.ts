import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';

@Injectable()
export class LeaveForfeitedReportService {
  getLeaveForfeitedData([tenantId, userId]: [string, string]) {
    return of(tenantId)
  }
}