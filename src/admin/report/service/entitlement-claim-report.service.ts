import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';
import { EntitlementClaimReportDto } from '../dto/entitlement-claim-report.dto';

/**
 * Entitlement claim report service
 *
 * @export
 * @class EntitlementClaimReportService
 */
@Injectable()
export class EntitlementClaimReportService {
  /**
   * Get entitlement claim data
   *
   * @param {[string, string]} [tenantId, userId]
   * @returns
   * @memberof EntitlementClaimReportService
   */
  getEntitlementClaimData([tenantId, userId]: [string, string]) {
    let entitlementClaimReportDto = new EntitlementClaimReportDto;
    let entitlementClaimData = [];

    entitlementClaimReportDto.userGuid = '';
    entitlementClaimReportDto.employeeNo = '';
    entitlementClaimReportDto.employeeName = '';
    entitlementClaimReportDto.leaveTypeId = '';
    entitlementClaimReportDto.leaveTypeName = '';
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