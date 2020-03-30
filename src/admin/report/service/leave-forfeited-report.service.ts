import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';
import { LeaveForfeitedReportDto } from '../dto/leave-forfeited-report.dto';

/**
 * Leave forfeited report service
 *
 * @export
 * @class LeaveForfeitedReportService
 */
@Injectable()
export class LeaveForfeitedReportService {
  /**
   * Get leave forfeited data
   *
   * @param {[string, string]} [tenantId, userId]
   * @returns
   * @memberof LeaveForfeitedReportService
   */
  getLeaveForfeitedData([tenantId, userId]: [string, string]) {
    let leaveForfeitedReportDto = new LeaveForfeitedReportDto;
    let userForfeitedData = [];

    leaveForfeitedReportDto.userGuid = "0089edb0-2bac-11ea-ae46-2fb9e0426975";
    leaveForfeitedReportDto.employeeNo = "1212";
    leaveForfeitedReportDto.employeeName = "KLKL";
    leaveForfeitedReportDto.leaveTypeId = "JBKHBKHUB";
    leaveForfeitedReportDto.leaveTypeName = "Annual Leave";
    leaveForfeitedReportDto.noOfDays = '1';

    leaveForfeitedReportDto.companyName = '';//resultUser.COMPANY_NAME;
    leaveForfeitedReportDto.department = '';//resultUser.DEPARTMENT;
    leaveForfeitedReportDto.costcentre = '';//resultUser.COSTCENTRE;
    leaveForfeitedReportDto.branch = '';//resultUser.BRANCH;

    userForfeitedData.push(leaveForfeitedReportDto);

    return of(userForfeitedData);
  }
}