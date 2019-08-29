import { Injectable } from '@nestjs/common';
import { UserLeaveEntitlementDbService } from '../db/user-leave-entitlement.db.service';
import { UserprofileDbService } from '../db/userprofile.db.service';
import { LeavetypeEntitlementDbService } from 'src/admin/leavetype-entitlement/db/leavetype-entitlement.db.service';
import { UserInfoService } from 'src/admin/user-info/user-info.service';
import { UserEntitlementAssignPolicy } from './userentitlement-assign-policy.service';
import { AssignLeavePolicyDTO } from '../dto/leave-entitlement/assign-leave-policy.dto';
import { map, filter, switchMap, mergeMap } from 'rxjs/operators';
import { LeaveTypeEntitlementModel } from 'src/admin/leavetype-entitlement/model/leavetype_entitlement.model';
import { IDbService } from 'src/interface/IDbService';

/**
 * Service user leave entitlement: assign entitlement
 *
 * @export
 * @class UserEntitlementAssignEntitlement
 */
@Injectable()
export class UserEntitlementAssignEntitlement {

  /**
   *Creates an instance of UserEntitlementAssignEntitlement.
   * @param {UserLeaveEntitlementDbService} userLeaveEntitlementDbService DB service for l_main_user_leave_entitlement
   * @param {UserprofileDbService} userDbService
   * @param {LeavetypeEntitlementDbService} leaveEntitlementDbService
   * @param {UserInfoService} userInfoDbService
   * @param {UserEntitlementAssignPolicy} userEntitlementAssignPolicy
   * @memberof UserEntitlementAssignEntitlement
   */
  constructor(
    public readonly userLeaveEntitlementDbService: UserLeaveEntitlementDbService,
    private readonly userDbService: UserprofileDbService,
    private readonly leaveEntitlementDbService: LeavetypeEntitlementDbService,
    private readonly userInfoDbService: UserInfoService,
    private readonly userEntitlementAssignPolicy: UserEntitlementAssignPolicy
  ) {

  }

  /**
   * Assign entitlement
   *
   * @param {*} user
   * @param {AssignLeavePolicyDTO} data
   * @returns
   * @memberof UserEntitlementAssignEntitlement
   */
  public assignEntitlement(user: any, data: AssignLeavePolicyDTO) {

    //check if the user belong to this tenant
    const userFilter = ['(USER_GUID IN (' + data.userId + '))', '(TENANT_GUID=' + user.TENANT_GUID + ')']

    return this.dbSearch(this.userDbService, userFilter)
      .pipe(
        filter(x => x != null),
        switchMap(() => {
          //check if current leavetype has active policy
          const userEntitlementFilter = [
            '(TENANT_GUID=' + user.TENANT_GUID + ')', '(ENTITLEMENT_GUID=' + data.leaveEntitlementId + ')',
            '(LEAVE_TYPE_GUID=' + data.leaveTypeId + ')', '(USER_GUID IN (' + data.userId + '))', '(ACTIVE_FLAG=1)'
          ]

          const dataTemp = this.dbSearch(this.userLeaveEntitlementDbService, userEntitlementFilter);
          console.log(dataTemp);
          return dataTemp;

        }),
        filter(x => x == null),
        switchMap(() => {

          // check if combination of main leave and entitlement def exist
          const entitlementFilter = [
            '(TENANT_GUID=' + user.TENANT_GUID + ')', '(ENTITLEMENT_GUID=' + data.leaveEntitlementId + ')',
            '(LEAVE_TYPE_GUID=' + data.leaveTypeId + ')', '(ACTIVE_FLAG=true)'
          ];

          return this.dbSearch(this.leaveEntitlementDbService, entitlementFilter);
        }),
        filter(x => x != null),
        mergeMap((res: LeaveTypeEntitlementModel) => {
          console.log(res);
          const userInfoFilter = ['(TENANT_GUID=' + user.TENANT_GUID + ')', '(USER_GUID IN (' + data.userId + '))']
          // console.log(userInfoFilter);
          return this.dbSearch(this.userInfoDbService, userInfoFilter)
            .pipe(map((userInfoResult) => {
              // console.log(res);
              return { res, userInfoResult }
            }))
        }),
        mergeMap((res) => {
          console.log(res.res);
          return this.userEntitlementAssignPolicy.assignPolicyProcess(res, user, data);

        })
      )

  }

  /**
   * Method db search
   *
   * @private
   * @param {IDbService} IDbService
   * @param {string[]} filter
   * @returns
   * @memberof UserEntitlementAssignEntitlement
   */
  private dbSearch(IDbService: IDbService, filter: string[]) {
    return IDbService.findByFilterV2([], filter)
      .pipe(
        map(res => {
          if (res.length > 0) {
            return res;
          } else {
            return 'success';
          }

        })
      )
  }
}