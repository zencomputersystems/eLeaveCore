import { Injectable, MethodNotAllowedException, BadRequestException } from '@nestjs/common';
import { UserLeaveEntitlementDbService } from '../db/user-leave-entitlement.db.service';
import { UserprofileDbService } from '../db/userprofile.db.service';
import { LeavetypeEntitlementDbService } from 'src/admin/leavetype-entitlement/db/leavetype-entitlement.db.service';
import { UserInfoService } from 'src/admin/user-info/user-info.service';
import { UserEntitlementAssignPolicy } from './userentitlement-assign-policy.service';
import { AssignLeavePolicyDTO } from '../dto/leave-entitlement/assign-leave-policy.dto';
import { map, filter, switchMap, mergeMap, throwIfEmpty, defaultIfEmpty, merge } from 'rxjs/operators';
import { LeaveTypeEntitlementModel } from 'src/admin/leavetype-entitlement/model/leavetype_entitlement.model';
import { IDbService } from 'src/interface/IDbService';
import { of } from 'rxjs';
import { CreateReplacementLeaveDTO } from '../dto/leave-entitlement/create-replacement-leave.dto';
import { UserLeaveEntitlementModel } from '../model/user-leave-entitlement.model';
import { v1 } from 'uuid';
import { Resource } from 'src/common/model/resource.model';
import moment = require('moment');
import { templateElement } from 'babel-types';

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
   * @param {LeavetypeEntitlementDbService} leaveEntitlementDbService DB service for leavetype entitlement
   * @param {UserInfoService} userInfoDbService
   * @param {UserEntitlementAssignPolicy} userEntitlementAssignPolicy
   * @memberof UserEntitlementAssignEntitlement
   */
  constructor(
    public readonly userLeaveEntitlementDbService: UserLeaveEntitlementDbService,
    private readonly userDbService: UserprofileDbService,
    public readonly leaveEntitlementDbService: LeavetypeEntitlementDbService,
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

          const temp = this.dbSearch(this.leaveEntitlementDbService, entitlementFilter);

          return temp;
        }),
        filter(x => x != null),
        mergeMap((res: LeaveTypeEntitlementModel) => {

          const userInfoFilter = ['(TENANT_GUID=' + user.TENANT_GUID + ')', '(USER_GUID IN (' + data.userId + '))']

          const dataTemp = this.dbSearch(this.userInfoDbService, userInfoFilter)
            .pipe(map((userInfoResult) => {
              return { res, userInfoResult }
            }))

          return dataTemp;
        }),
        mergeMap((res) => {
          const results = this.userEntitlementAssignPolicy.assignPolicyProcess([res, user, data]);
          return results;
        })
      )

  }

  /**
   * Assign leave entitlement
   *
   * @param {*} user
   * @param {AssignLeavePolicyDTO} data
   * @returns
   * @memberof UserEntitlementAssignEntitlement
   */
  public assignLeaveEntitlement(user: any, data: AssignLeavePolicyDTO) {
    //check if the user belong to this tenant
    const userFilter = ['(USER_GUID IN (' + data.userId + '))', '(TENANT_GUID=' + user.TENANT_GUID + ')']
    let failedList = [];
    let successList = [];
    let userStatus = {};
    let successData = [];
    return this.dbSearch(this.userDbService, userFilter)
      .pipe(
        map(res => {
          // Check if in this tenant
          data.userId.forEach(element => {

            let checkUser = res.find(x => x.USER_GUID === element);
            if (checkUser) {
              successList.push(element);
              successData.push(checkUser);
            } else {
              userStatus['userGuid'] = element;
              userStatus['status'] = 'Not in this tenant';
              failedList.push(userStatus);
            }
          });

          return successList;
        }),
        mergeMap(res => {
          // check if user already entitled
          if (res.length > 0) {
            const userEntitlementFilter = [
              '(TENANT_GUID=' + user.TENANT_GUID + ')', '(ENTITLEMENT_GUID=' + data.leaveEntitlementId + ')',
              '(LEAVE_TYPE_GUID=' + data.leaveTypeId + ')', '(USER_GUID IN (' + res + '))', '(ACTIVE_FLAG=1)'
            ]
            const dataTemp = this.dbSearch(this.userLeaveEntitlementDbService, userEntitlementFilter);
            return dataTemp;
          }
        }), mergeMap(res => {
          // assign status user already entitled
          if (res != 'success') {

            let tempSuccess = [];
            const sizeData = successList.length;
            for (let i = 0; i < sizeData; i++) {
              userStatus = {};
              let element = successList[i];
              let checkUser = res.filter(x => x.USER_GUID === element);

              if (checkUser.length > 0) {
                userStatus['userGuid'] = element;
                userStatus['status'] = 'User already entitled';

                failedList.push(userStatus);
              } else {
                tempSuccess.push(element);
              }
            }
            successList = tempSuccess;
            return successList.length > 0 ? successList : 'no data';
          }
          return successList;
        }), switchMap(res => {
          if (res != null) {
            // check if combination of main leave and entitlement def exist
            const entitlementFilter = [
              '(TENANT_GUID=' + user.TENANT_GUID + ')', '(ENTITLEMENT_GUID=' + data.leaveEntitlementId + ')',
              '(LEAVE_TYPE_GUID=' + data.leaveTypeId + ')', '(ACTIVE_FLAG=true)'
            ];
            const temp = this.dbSearch(this.leaveEntitlementDbService, entitlementFilter);
            return temp;
          }
        }), mergeMap(res => {
          // assign status leavetype entitlement not found
          if (res.length > 0) {
            return res;
          } else {
            failedList.push('Leavetype entitlement not found');
          }
        }), mergeMap(res => {
          if (successList.length > 0) {
            data['userId'] = successList;
            successData['userInfoResult'] = successData;
            successData['res'] = [];
            successData['res'].push(res);
            return this.userEntitlementAssignPolicy.assignPolicyProcess([successData, user, data]);
          } else {
            return of(null);
          }
        }), map(res => {
          let finalResult = {};
          // finalResult['successList'] = successList;
          finalResult['successList'] = res == null ? [] : res;
          finalResult['failedList'] = failedList;
          // finalResult['detailsSuccess'] = res;
          return finalResult;
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