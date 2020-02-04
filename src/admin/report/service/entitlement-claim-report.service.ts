import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';

@Injectable()
export class EntitlementClaimReportService {
  getEntitlementClaimData([tenantId, userId]: [string, string]) {
    return of(tenantId);
  }
}