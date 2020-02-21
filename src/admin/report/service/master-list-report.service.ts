import { Injectable } from '@nestjs/common';
import { ReportDBService } from './report-db.service';
import { map, mergeMap } from 'rxjs/operators';
import { MasterListReportDto } from '../dto/master-list-report.dto';
import { PendingLeaveService } from 'src/admin/approval-override/pending-leave.service';

@Injectable()
export class MasterListReportService {
  constructor(private readonly reportDBService: ReportDBService,
    private readonly pendingLeaveService: PendingLeaveService) { }
  getMasterListData([tenantId, userId]: [string, string]) {
    let filter = [`(TENANT_GUID=${tenantId})`];
    const extra = ['(USER_GUID=' + userId + ')'];
    filter = userId != null ? filter.concat(extra) : filter;

    return this.reportDBService.userprofileDbService.findByFilterV2([], filter).pipe(
      mergeMap(async res => {
        let companyList = await this.pendingLeaveService.getCompanyList(res[0].TENANT_GUID) as any[];
        let resultAll = await this.pendingLeaveService.getAllUserInfo(res[0].TENANT_GUID) as any[];
        return await { res, companyList, resultAll };

      }),
      mergeMap(async result => {
        let userIdList = []
        let { res, companyList, resultAll } = result;
        res.forEach(element => {
          let masterListReportDTO = new MasterListReportDto;
          let managerUser = element.MANAGER_USER_GUID != null ? resultAll.find(x => x.USER_GUID === element.MANAGER_USER_GUID) : [];

          let managerName = managerUser != undefined ? managerUser.hasOwnProperty('FULLNAME') ? managerUser.FULLNAME : '' : '';

          let resultCompany = element.TENANT_COMPANY_GUID != null ? companyList.find(x => x.TENANT_COMPANY_GUID === element.TENANT_COMPANY_GUID) : [];

          masterListReportDTO.userGuid = element.USER_GUID;
          masterListReportDTO.employeeNo = element.STAFF_ID;
          masterListReportDTO.employeeName = element.FULLNAME;
          masterListReportDTO.companyName = resultCompany.NAME || null;
          masterListReportDTO.department = element.DEPARTMENT;
          masterListReportDTO.designation = element.DESIGNATION;
          masterListReportDTO.email = element.EMAIL;
          masterListReportDTO.approver = managerName;
          masterListReportDTO.joinDate = element.JOIN_DATE;
          masterListReportDTO.confirmDate = element.CONFIRMATION_DATE;
          masterListReportDTO.resignDate = element.RESIGNATION_DATE;
          masterListReportDTO.status = element.EMPLOYEE_STATUS;

          userIdList.push(masterListReportDTO);
        });
        return await userIdList;

      }), map(res => {
        return res;
      })

    );
  }
}