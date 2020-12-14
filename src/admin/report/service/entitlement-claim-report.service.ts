import { Injectable } from '@nestjs/common';
import { of, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { EntitlementClaimTraceDbService } from 'src/api/userprofile/db/entitlement-claim-trace.db.service';
import { EntitlementClaimReportDto } from '../dto/entitlement-claim-report.dto';
import { UserprofileDbService } from '../../../api/userprofile/db/userprofile.db.service';
import { LeavetypeService } from 'src/admin/leavetype/leavetype.service';
import { UserLeaveEntitlementDbService } from 'src/api/userprofile/db/user-leave-entitlement.db.service';

/**
 * Entitlement claim report service
 *
 * @export
 * @class EntitlementClaimReportService
 */
@Injectable()
export class EntitlementClaimReportService {
  constructor(
    private readonly entitlementClaimTraceDbService: EntitlementClaimTraceDbService,
    private readonly userprofileDbService: UserprofileDbService,
    private readonly leavetypeService: LeavetypeService,
    private readonly userLeaveEntitlementDbService: UserLeaveEntitlementDbService
  ) { }
  /**
   * Get entitlement claim data
   *
   * @param {[string, string]} [tenantId, userId]
   * @returns
   * @memberof EntitlementClaimReportService
   */
  getEntitlementClaimData([tenantId, userId]: [string, string]) {
    let filter = [`(TENANT_GUID=${tenantId})`];
    const extra = ['(USER_GUID=' + userId + ')'];
    filter = userId != null ? filter.concat(extra) : filter;
    return this.entitlementClaimTraceDbService.findByFilterV2([], filter).pipe(
      mergeMap(res => {
        let leavetypeIdList = [...new Set(res.map(item => item.LEAVE_TYPE_GUID))];
        let userIdList = [...new Set(res.map(item => item.USER_GUID))];
        let userLeaveEntitlementIdList = [...new Set(res.map(item => item.USER_LEAVE_ENTITLEMENT_GUID))];

        let leavetypeData = this.leavetypeService.findByFilterV2([], [`(LEAVE_TYPE_GUID IN (${leavetypeIdList}))`]);
        let userData = this.userprofileDbService.findByFilterV2([], [`(USER_GUID IN (${userIdList}))`]);
        let userLeaveEntitlement = this.userLeaveEntitlementDbService.findByFilterV2([], [`(USER_LEAVE_ENTITLEMENT_GUID IN (${userLeaveEntitlementIdList}))`]);
        return forkJoin([of(res), leavetypeData, userData, userLeaveEntitlement]);
      }),
      map(res => {
        let [claimData, leavetypeData, userData, userLeaveEntitlementData] = res;

        let entitlementClaimData = [];
        claimData.forEach(element => {
          let userInfo = userData.find(x => x.USER_GUID === element.USER_GUID);
          let leavetypeInfo = leavetypeData.find(x => x.LEAVE_TYPE_GUID === element.LEAVE_TYPE_GUID);
          let userLeaveEntitlementInfo = userLeaveEntitlementData.find(x => x.USER_LEAVE_ENTITLEMENT_GUID === element.USER_LEAVE_ENTITLEMENT_GUID);

          let entitlementClaimReportDto = new EntitlementClaimReportDto;

          entitlementClaimReportDto.userGuid = element.USER_GUID;
          entitlementClaimReportDto.employeeNo = userInfo.STAFF_ID;
          entitlementClaimReportDto.employeeName = userInfo.FULLNAME;
          entitlementClaimReportDto.leaveTypeId = element.LEAVE_TYPE_GUID;
          entitlementClaimReportDto.leaveTypeName = leavetypeInfo.CODE;
          entitlementClaimReportDto.applyDate = element.CREATION_TS;
          entitlementClaimReportDto.startDate = userLeaveEntitlementInfo.CREATION_TS;
          entitlementClaimReportDto.endDate = userLeaveEntitlementInfo.EXPIREDATE;
          entitlementClaimReportDto.noOfDays = element.NO_OF_DAYS;
          entitlementClaimReportDto.status = null;
          entitlementClaimReportDto.requestRemarks = null;
          entitlementClaimReportDto.finalApproveRemarks = element.REMARKS;

          entitlementClaimReportDto.companyName = userInfo.COMPANY_NAME;
          entitlementClaimReportDto.department = userInfo.DEPARTMENT;
          entitlementClaimReportDto.costcentre = userInfo.COSTCENTRE;
          entitlementClaimReportDto.branch = userInfo.BRANCH;

          entitlementClaimData.push(entitlementClaimReportDto);
        })
        return entitlementClaimData;
      })
    );


  }
}