import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LeaveForfeitedReportDto } from '../dto/leave-forfeited-report.dto';
import { LeaveEntitlementReportService } from './leave-entitlement-report.service';

/**
 * Leave forfeited report service
 *
 * @export
 * @class LeaveForfeitedReportService
 */
@Injectable()
export class LeaveForfeitedReportService {
  constructor(private readonly leaveEntitlementReportService: LeaveEntitlementReportService) { }
  /**
   * Get leave forfeited data
   *
   * @param {[string, string]} [tenantId, userId]
   * @returns
   * @memberof LeaveForfeitedReportService
   */
  getLeaveForfeitedData([tenantId, userId]: [string, string]) {

    return this.leaveEntitlementReportService.getLeaveEntitlementData([tenantId, userId]).pipe(
      map(res => {

        let userForfeitedData = [];
        res.forEach(element => {
          element.leaveDetail.forEach(element2 => {

            if (element2.forfeited > 0) {
              let leaveForfeitedReportDto = new LeaveForfeitedReportDto;

              leaveForfeitedReportDto.userGuid = element.userGuid;
              leaveForfeitedReportDto.employeeNo = element.employeeNo;
              leaveForfeitedReportDto.employeeName = element.employeeName;
              leaveForfeitedReportDto.leaveTypeId = element2.leaveTypeId;
              leaveForfeitedReportDto.leaveTypeName = element2.leaveTypeName;
              leaveForfeitedReportDto.noOfDays = element2.forfeited;

              leaveForfeitedReportDto.companyName = element.companyName;
              leaveForfeitedReportDto.department = element.department;
              leaveForfeitedReportDto.costcentre = element.costcentre;
              leaveForfeitedReportDto.branch = element.branch;

              userForfeitedData.push(leaveForfeitedReportDto);
            }
          });
        });
        return userForfeitedData;

      })
    )

  }
}