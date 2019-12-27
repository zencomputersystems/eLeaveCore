import { Injectable } from '@nestjs/common';
import { UserprofileDbService } from 'src/api/userprofile/db/userprofile.db.service';
import { map, mergeMap } from 'rxjs/operators';
import { UserInfoDbService } from '../holiday/db/user-info.db.service';
import { forkJoin } from 'rxjs';
import { v1 } from 'uuid';
import { Resource } from '../../common/model/resource.model';
import { UserModel } from '../user/model/user.model';
import { setUpdateData } from '../../common/helper/basic-functions';

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
   *
   * @param {string} userGuid
   * @param {string} tenantGuid
   * @returns
   * @memberof UserInfoActivateService
   */
  public createNewUserInfo(userGuid: string, user: any) {
    return this.getInfoUser(userGuid, user.TENANT_GUID).pipe(
      map(res => {
        // Create new user info data by previous info
        const prevData = res[1][0];

        // Reset user info to make it active
        prevData.USER_INFO_GUID = v1();
        prevData.RESIGNATION_DATE = null;
        prevData.CREATION_USER_GUID = user.USER_GUID;

        // Prepare data to create
        const resource = new Resource(new Array);
        resource.resource.push(prevData);

        // Create new data info
        return this.userInfoDbService.createByModel(resource, [], [], []);
      }), mergeMap(res => {
        // Update user main activation flag to active
        let url = this.userInfoDbService.queryService.generateDbQueryV2('user_main', [], ['(USER_GUID=' + userGuid + ')'], []);

        // Setup data to update
        let dataUserMain = new UserModel();

        dataUserMain.ACTIVATION_FLAG = 1;
        setUpdateData([dataUserMain, user.USER_GUID]);

        // Prepare update data
        const resource = new Resource(new Array);
        resource.resource.push(dataUserMain);

        let userMainProcess = this.userInfoDbService.httpService.patch(url, resource);

        // Join userinfo and usermain create info and update activation flag
        return forkJoin(res, userMainProcess);
      })
    );
  }

}