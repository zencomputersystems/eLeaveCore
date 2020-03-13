import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';
import { UserInfoDbService } from '../holiday/db/user-info.db.service';
import * as moment from 'moment';
import { UserprofileDbService } from '../../api/userprofile/db/userprofile.db.service';

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
    private readonly userInfoDbService: UserInfoDbService,
    private readonly userprofileDbService: UserprofileDbService
  ) { }

  /**
   * Retrieve upcoming joiner
   *
   * @param {string} tenantGuid
   * @returns
   * @memberof DashboardAdminService
   */
  public getUpcomingJoiner(tenantGuid: string) {
    let filterJoiner = ['(JOIN_DATE > "' + moment().format('YYYY-MM-DD') + '") AND (TENANT_GUID=' + tenantGuid + ')'];
    let fieldsJoiner = ['USER_GUID', 'FULLNAME', 'DESIGNATION', 'JOIN_DATE'];
    return this.userInfoDbService.findByFilterV3(fieldsJoiner, filterJoiner);
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
    let fields = ['USER_GUID', 'FULLNAME', 'DESIGNATION', 'RESIGNATION_DATE'];
    return this.userInfoDbService.findByFilterV3(fields, filter);
  }

  /**
   * Get birthday leave
   *
   * @param {string} tenantGuid
   * @returns
   * @memberof DashboardAdminService
   */
  public getBirthdayList(tenantGuid: string) {
    let filter = ['(DELETED_AT IS NULL) AND (TENANT_GUID=' + tenantGuid + ')'];
    let fields = ['USER_GUID', 'FULLNAME', 'DESIGNATION', 'DOB'];
    return this.userprofileDbService.findByFilterV3(fields, filter);
  }

}