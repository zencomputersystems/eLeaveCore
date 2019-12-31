import { Injectable } from '@nestjs/common';
import { UserprofileDbService } from 'src/api/userprofile/db/userprofile.db.service';
import { CompanyDbService } from '../company/company.service';
import { LeavetypeService } from '../leavetype/leavetype.service';

/**
 * Get all pending leave service function
 *
 * @export
 * @class PendingLeaveService
 */
@Injectable()
export class PendingLeaveService {
  /**
   *Creates an instance of PendingLeaveService.
   * @param {UserprofileDbService} userprofileDbService user profile db service
   * @param {CompanyDbService} companyDbService company db service
   * @param {LeavetypeService} leavetypeService leave type db service
   * @memberof PendingLeaveService
   */
  constructor(
    private readonly userprofileDbService: UserprofileDbService,
    private readonly companyDbService: CompanyDbService,
    private readonly leavetypeService: LeavetypeService
  ) { }

  /**
   * Get company list using callback function
   *
   * @param {string} TENANT_GUID
   * @returns
   * @memberof PendingLeaveService
   */
  public async getCompanyList(TENANT_GUID: string) {
    return await this.runService(this.companyDbService.findByFilterV2([], ['(TENANT_GUID=' + TENANT_GUID + ')']));
  }

  /**
   * Get leavetype list using callback function
   *
   * @param {string} TENANT_GUID
   * @returns
   * @memberof PendingLeaveService
   */
  public async getLeavetypeList(TENANT_GUID: string) {
    return await this.runService(this.leavetypeService.findByFilterV2([], ['(TENANT_GUID=' + TENANT_GUID + ')']));
  }

  /**
   * Get personal info using callback function
   *
   * @param {string[]} userGuid
   * @returns
   * @memberof PendingLeaveService
   */
  public async getUserInfo(userGuid: string[]) {
    return await this.runService(this.userprofileDbService.findByFilterV2([], ['(USER_GUID IN (' + userGuid + ')']));
  }

  /**
   * Run callback function
   *
   * @param {*} method
   * @returns
   * @memberof PendingLeaveService
   */
  public async runService(method) {
    const cbService = () => {
      return new Promise((resolve, reject) => {
        method.subscribe(
          data => {
            resolve(data);
          }, err => {
            return reject(err);
          }
        )
      })
    }
    return await cbService();
  }

}