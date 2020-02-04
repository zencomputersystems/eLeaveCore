import { Injectable } from '@nestjs/common';
import { ReportDBService } from './report-db.service';
import { map } from 'rxjs/operators';
import { MasterListReportDto } from '../dto/master-list-report.dto';

@Injectable()
export class MasterListReportService {
  constructor(private readonly reportDBService: ReportDBService) { }
  getMasterListData([tenantId]: [string]) {
    return this.reportDBService.userprofileDbService.findByFilterV2([], [`(TENANT_GUID=${tenantId})`]).pipe(
      map(res => {
        let userIdList = []
        res.forEach(element => {
          let masterListReportDTO = new MasterListReportDto;

          masterListReportDTO.userGuid = element.USER_GUID;
          masterListReportDTO.employeeNo = element.STAFF_ID;
          masterListReportDTO.employeeName = element.FULLNAME;
          masterListReportDTO.companyName = element.TENANT_COMPANY_GUID;
          masterListReportDTO.department = element.DEPARTMENT;
          masterListReportDTO.email = element.EMAIL;
          masterListReportDTO.approver = element.MANAGER_USER_GUID;
          masterListReportDTO.joinDate = element.JOIN_DATE;
          masterListReportDTO.confirmDate = element.CONFIRMATION_DATE;
          masterListReportDTO.resignDate = element.RESIGNATION_DATE;
          masterListReportDTO.status = element.STATUS_ACTIVATION;

          userIdList.push(masterListReportDTO);

        });
        return userIdList;
      })

    );
  }
}