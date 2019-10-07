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
import { of } from 'rxjs';
import { CreateReplacementLeaveDTO } from '../dto/leave-entitlement/create-replacement-leave.dto';
import { UserLeaveEntitlementModel } from '../model/user-leave-entitlement.model';
import { v1 } from 'uuid';
import { Resource } from 'src/common/model/resource.model';
import moment = require('moment');

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
          const userInfoFilter = ['(TENANT_GUID=' + user.TENANT_GUID + ')', '(USER_GUID IN (' + data.userId + '))']
          // console.log(userInfoFilter);
          return this.dbSearch(this.userInfoDbService, userInfoFilter)
            .pipe(map((userInfoResult) => {
              // console.log(res);
              return { res, userInfoResult }
            }))
        }),
        mergeMap((res) => {
          return this.userEntitlementAssignPolicy.assignPolicyProcess(res, user, data);

        })
      )

  }

  /**
   * Assign replacement leave
   *
   * @param {*} user
   * @param {CreateReplacementLeaveDTO} data
   * @returns
   * @memberof UserEntitlementAssignEntitlement
   */
  public assignReplacementLeave(user: any, data: CreateReplacementLeaveDTO) {
    const { length } = data.userId;
    const resource = new Resource(new Array());
    const entitlementFilter = [
      '(TENANT_GUID=' + user.TENANT_GUID + ')', '(ENTITLEMENT_GUID=' + data.leaveEntitlementId + ')',
      '(LEAVE_TYPE_GUID=' + data.leaveTypeId + ')', '(ACTIVE_FLAG=true)'
    ];

    // this.dbSearch(this.leaveEntitlementDbService, entitlementFilter).subscribe(
    //   data => {
    //     console.log(data);

    //   }, err => {
    //     console.log(err);
    //   }
    // )

    // console.log(length);
    for (let i = 0; i < length; i++) {

      //get the entitlement days
      const entitlementDay = data.noOfDays;

      // assign new policy to user
      const entitlementModel = new UserLeaveEntitlementModel();
      entitlementModel.USER_LEAVE_ENTITLEMENT_GUID = v1();
      entitlementModel.LEAVE_TYPE_GUID = data.leaveTypeId;
      entitlementModel.ENTITLEMENT_GUID = data.leaveEntitlementId;
      entitlementModel.USER_GUID = data.userId[i];
      entitlementModel.EXPIREDATE = new Date(moment().add(3, 'M').format('YYYY-MM-DD'));
      entitlementModel.PARENT_FLAG = 1;
      entitlementModel.CF_FLAG = 0;
      // entitlementModel.PROPERTIES_XML = res.res[0].PROPERTIES_XML;
      entitlementModel.YEAR = moment().year();
      entitlementModel.REMARKS = null;
      entitlementModel.ACTIVE_FLAG = 1;

      entitlementModel.TENANT_GUID = user.TENANT_GUID;
      entitlementModel.CREATION_USER_GUID = user.USER_GUID;

      entitlementModel.DAYS_ADDED = entitlementDay;

      resource.resource.push(entitlementModel);

    }

    return this.userLeaveEntitlementDbService.createByModel(resource, [], [], [])
      .pipe(map(res => {
        if (res.status == 200) {
          return res.data.resource;
        }
      }))

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