import { Injectable } from '@nestjs/common';
import { ViewUserProfileListModel } from 'src/api/userprofile/model/view_userprofile_list.model';
import { Resource } from 'src/common/model/resource.model';
import { UserModel } from 'src/admin/user/model/user.model';
import { UserService } from 'src/admin/user/user.service';
import { GeneralLeavePolicyService } from 'src/admin/general-leave-policy/general-leave-policy.service';
import { AssignCarryForwardService } from './assign-carry-forward.service';

/**
 * Service disable resign user
 *
 * @export
 * @class DisableResignUser
 */
@Injectable()
export class DisableResignUser {
  /**
   *Creates an instance of DisableResignUser.
   * @param {UserService} userService user service
   * @param {GeneralLeavePolicyService} generalLeavePolicyService general leave policy service
   * @param {AssignCarryForwardService} assignCarryForwardService assign carry forward service
   * @memberof DisableResignUser
   */
  constructor(
    private readonly userService: UserService,
    public generalLeavePolicyService: GeneralLeavePolicyService,
    public assignCarryForwardService: AssignCarryForwardService
  ) { }

  /**
   * Check if user has resignation date - we disable them
   *
   * @param {ViewUserProfileListModel[]} res
   * @returns
   * @memberof YearEndClosingService
   */
  public checkUser(res: ViewUserProfileListModel[]) {
    let userInfo: ViewUserProfileListModel[] = res;

    let resignUser = [];
    let activeUser = [];
    let disabledUser = [];

    userInfo.forEach(element => {
      if (new Date(element.RESIGNATION_DATE).getFullYear() <= new Date().getFullYear() && element.RESIGNATION_DATE != null && element.ACTIVATION_FLAG == 1) {
        resignUser.push(element);
      } else if (element.ACTIVATION_FLAG == 1) {
        activeUser.push(element);
      } else {
        disabledUser.push(element);
      }
    });

    // console.log(resignUser.length + ' - ' + activeUser.length + ' - ' + disabledUser.length);

    return { resignUser, activeUser, disabledUser };
  }

  /**
   * Setup disable user list
   *
   * @param {*} user
   * @param {*} resignUser
   * @returns
   * @memberof YearEndClosingService
   */
  public disableProcess(user, resignUser) {
    let disableUserGroup = '';
    resignUser.forEach(element => {
      if (disableUserGroup == '') { disableUserGroup = '"' + element.USER_GUID + '"'; }
      else { disableUserGroup = disableUserGroup + ',"' + element.USER_GUID + '"'; }
    });
    let resultDisable = this.disableUser(user, disableUserGroup);
    return resultDisable;
  }

  /**
   * Process disable user
   *
   * @param {*} user
   * @param {string} userToDisable
   * @returns
   * @memberof YearEndClosingService
   */
  public disableUser(user: any, userToDisable: string) {
    // userToDisable = '"2b93fc11-23d5-db42-dd9f-bb9499071156","7756ab98-e69e-48e1-5fc3-b7e30a157cf3"';

    const resource = new Resource(new Array);
    const data = new UserModel();

    data.ACTIVATION_FLAG = 0;
    data.UPDATE_TS = new Date().toISOString();
    data.UPDATE_USER_GUID = user.USER_GUID;

    resource.resource.push(data);

    return this.userService.updateByModel(resource, [], ['(USER_GUID IN (' + userToDisable + '))'], ['EMAIL']);
  }
}