import { Injectable } from '@nestjs/common';
import { UserprofileDbService } from 'src/api/userprofile/db/userprofile.db.service';
import { CompanyDbService } from '../company/company.service';
import { LeavetypeService } from '../leavetype/leavetype.service';

@Injectable()
export class PendingLeaveService {
  constructor(
    private readonly userprofileDbService: UserprofileDbService,
    private readonly companyDbService: CompanyDbService,
    private readonly leavetypeService: LeavetypeService
  ) { }

  public async getCompanyList(TENANT_GUID: string) {
    const cbCompany = () => {
      return new Promise((resolve, reject) => {
        this.companyDbService.findByFilterV2([], ['(TENANT_GUID=' + TENANT_GUID + ')']).subscribe(
          data => {
            resolve(data);
          }, err => {
            return reject(err);
          }
        )
      })
    }
    let companyList = await cbCompany() as any[];
    return companyList;
  }

  public async getLeavetypeList(TENANT_GUID: string) {
    const cbLeaveType = () => {
      return new Promise((resolve, reject) => {
        this.leavetypeService.findByFilterV2([], ['(TENANT_GUID=' + TENANT_GUID + ')']).subscribe(
          data => {
            resolve(data);
          }, err => {
            return reject(err);
          }
        )
      })
    }
    let leaveTypeList = await cbLeaveType() as any[];
    return leaveTypeList;
  }

  public async getUserInfo(userGuid: string[]) {
    const cbInfo = () => {
      return new Promise((resolve, reject) => {
        this.userprofileDbService.findByFilterV2([], ['(USER_GUID IN (' + userGuid + ')']).subscribe(
          data => {
            resolve(data);
          }, err => {
            return reject(err);
          }
        )
      });
    }
    let resultAll = await cbInfo() as any[];
    return resultAll;
  }

}