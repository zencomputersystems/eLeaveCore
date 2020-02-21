import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';
import { EntitlementClaimReportDto } from '../dto/entitlement-claim-report.dto';

@Injectable()
export class EntitlementClaimReportService {
  getEntitlementClaimData([tenantId, userId]: [string, string]) {
    let entitlementClaimReportDto = new EntitlementClaimReportDto;
    let entitlementClaimData = [];

    entitlementClaimReportDto.userGuid = '';
    entitlementClaimReportDto.employeeNo = '';
    entitlementClaimReportDto.employeeName = '';
    entitlementClaimReportDto.leaveType = '';
    entitlementClaimReportDto.applyDate = '';
    entitlementClaimReportDto.startDate = '';
    entitlementClaimReportDto.endDate = '';
    entitlementClaimReportDto.noOfDays = '';
    entitlementClaimReportDto.status = '';
    entitlementClaimReportDto.requestRemarks = '';
    entitlementClaimReportDto.finalApproveRemarks = '';

    entitlementClaimData.push(entitlementClaimReportDto);

    return of(entitlementClaimData);
  }
}