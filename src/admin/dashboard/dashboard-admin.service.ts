import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';
import { UserInfoDbService } from '../holiday/db/user-info.db.service';
import * as moment from 'moment';

/**
 * Service for dashboard admin
 *
 * @export
 * @class DashboardAdminService
 */
@Injectable()
export class DashboardAdminService {

  /**
   *Creates an instance of DashboardAdminService.
   * @param {UserInfoDbService} userInfoDbService DB service user info
   * @memberof DashboardAdminService
   */
  constructor(
    private readonly userInfoDbService: UserInfoDbService
  ) { }

  /**
   * Retrieve upcoming joiner
   *
   * @param {string} tenantGuid
   * @returns
   * @memberof DashboardAdminService
   */
  public getUpcomingJoiner(tenantGuid: string) {
    let filter = ['(JOIN_DATE > "' + moment().format('YYYY-MM-DD') + '") AND (TENANT_GUID=' + tenantGuid + ')'];
    let fields = ['FULLNAME', 'DESIGNATION', 'JOIN_DATE'];
    return this.userInfoDbService.findByFilterV3(fields, filter);
  }

  /**
   * Retrieve upcoming leaver
   *
   * @param {string} tenantGuid
   * @returns
   * @memberof DashboardAdminService
   */
  public getUpcomingLeaver(tenantGuid: string) {
    let filter = ['(RESIGNATION_DATE > "' + moment().format('YYYY-MM-DD') + '") AND (TENANT_GUID=' + tenantGuid + ')'];
    let fields = ['FULLNAME', 'DESIGNATION', 'RESIGNATION_DATE'];
    return this.userInfoDbService.findByFilterV3(fields, filter);
  }

}