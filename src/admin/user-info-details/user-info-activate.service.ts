import { Injectable } from '@nestjs/common';
import { UserprofileDbService } from 'src/api/userprofile/db/userprofile.db.service';
import { map, mergeMap } from 'rxjs/operators';
import { UserInfoDbService } from '../holiday/db/user-info.db.service';
import { forkJoin } from 'rxjs';
import { v1 } from 'uuid';
import { Resource } from '../../common/model/resource.model';

/**
 * Reactivate user
 *
 * @export
 * @class UserInfoActivateService
 */
@Injectable()
export class UserInfoActivateService {
  /**
   *Creates an instance of UserInfoActivateService.
   * @param {UserprofileDbService} userprofileDbService userprofile db service
   * @param {UserInfoDbService} userInfoDbService user info db service
   * @memberof UserInfoActivateService
   */
  constructor(
    private readonly userprofileDbService: UserprofileDbService,
    private readonly userInfoDbService: UserInfoDbService
  ) { }

  /**
   * Get user info inactive history
   * NEED TO FILTER BY INACTIVE USER
   *
   * @param {string} userGuid
   * @param {string} tenantGuid
   * @returns
   * @memberof UserInfoActivateService
   */
  public getInfoUser(userGuid: string, tenantGuid: string) {
    return this.userprofileDbService.findByFilterV2([], ['(USER_GUID=' + userGuid + ')', '(TENANT_GUID=' + tenantGuid + ')']).pipe(
      mergeMap(res => {
        let userInfoData = this.userInfoDbService.findByFilterV2([], ['(USER_INFO_GUID=' + res[0].USER_INFO_GUID + ')']);
        return forkJoin(res, userInfoData);
      })
    );
  }

  /**
   * Create new user info
   * NEED TO UPDATE USER_MAIN ACTIVATION_FLAG
   *
   * @param {string} userGuid
   * @param {string} tenantGuid
   * @returns
   * @memberof UserInfoActivateService
   */
  public createNewUserInfo(userGuid: string, tenantGuid: string) {
    return this.getInfoUser(userGuid, tenantGuid).pipe(
      mergeMap(res => {
        const prevData = res[1][0];

        prevData.USER_INFO_GUID = v1();
        prevData.RESIGNATION_DATE = null;

        const resource = new Resource(new Array);
        resource.resource.push(prevData);
        return this.userInfoDbService.createByModel(resource, [], [], []);
      })
    );
  }

}