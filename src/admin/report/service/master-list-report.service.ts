import { Injectable } from '@nestjs/common';
import { ReportDBService } from './report-db.service';
import { map, mergeMap } from 'rxjs/operators';
import { MasterListReportDto } from '../dto/master-list-report.dto';
import { PendingLeaveService } from 'src/admin/approval-override/pending-leave.service';

@Injectable()
export class MasterListReportService {
  constructor(private readonly reportDBService: ReportDBService,
    private readonly pendingLeaveService: PendingLeaveService) { }
  getMasterListData([tenantId]: [string]) {
    return this.reportDBService.userprofileDbService.findByFilterV2([], [`(TENANT_GUID=${tenantId})`]).pipe(
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
          // console.log(managerUser);
          // console.log(element.FULLNAME);
          // console.log(managerUser.FULLNAME);
          let managerName = managerUser != undefined ? managerUser.hasOwnProperty('FULLNAME') ? managerUser.FULLNAME : '' : '';

          let resultCompany = element.TENANT_COMPANY_GUID != null ? companyList.find(x => x.TENANT_COMPANY_GUID === element.TENANT_COMPANY_GUID) : [];
          // console.log(element.MANAGER_USER_GUID);
          // console.log(element.USER_GUID);


          // console.log(managerName);

          masterListReportDTO.userGuid = element.USER_GUID;
          masterListReportDTO.employeeNo = element.STAFF_ID;
          masterListReportDTO.employeeName = element.FULLNAME;
          masterListReportDTO.companyName = resultCompany.NAME || null;
          masterListReportDTO.department = element.DEPARTMENT;
          masterListReportDTO.email = element.EMAIL;
          masterListReportDTO.approver = managerName;
          masterListReportDTO.joinDate = element.JOIN_DATE;
          masterListReportDTO.confirmDate = element.CONFIRMATION_DATE;
          masterListReportDTO.resignDate = element.RESIGNATION_DATE;
          masterListReportDTO.status = element.STATUS_ACTIVATION;

          // console.log(masterListReportDTO);
          userIdList.push(masterListReportDTO);

        });
        return await userIdList;
      }), map(res => {
        console.log(res);
        return res;
      })

    );
  }
}