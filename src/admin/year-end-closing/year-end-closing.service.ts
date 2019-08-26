import { Injectable } from '@nestjs/common';
import { Observable, of, pipe, forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { UserLeaveEntitlementDbService } from 'src/api/userprofile/db/user-leave-entitlement.db.service';
import { UserInfoDbService } from '../holiday/db/user-info.db.service';
import { UserInfoModel } from '../user-info/model/user-info.model';
import { Resource } from 'src/common/model/resource.model';
import { UserModel } from '../user/model/user.model';
import { LeavetypeService } from '../leavetype/leavetype.service';
import { LeavetypeEntitlementDbService } from '../leavetype-entitlement/db/leavetype-entitlement.db.service';
import { LeaveTypeEntitlementModel } from '../leavetype-entitlement/model/leavetype_entitlement.model';
import { UserLeaveEntitlementService } from 'src/api/userprofile/service/user-leave-entitlement.service';
import { AssignLeavePolicyDTO } from '../../api/userprofile/dto/leave-entitlement/assign-leave-policy.dto';
import { YearEndAssignEntitlementService } from './service/year-end-assign-entitlement.service';
import { UserLeaveEntitlementModel } from 'src/api/userprofile/model/user-leave-entitlement.model';
import { v1 } from 'uuid';
import { ServiceYearCalc } from 'src/common/policy/entitlement-type/services/service-year-calculation-service/serviceYearCalc.service';
import { ProratedDateEndYearService } from 'src/common/policy/entitlement-type/services/leave-entitlement-type/proratedDateEndYear.service';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { LeaveEntitlementBaseService } from 'src/common/policy/entitlement-type/services/leave-entitlement-type/leave-entitlement-base.service';
import { UserLeaveEntitlementSummaryDbService } from 'src/api/userprofile/db/user-leave-summary.db.service';

type userEntitlement = [Resource, LeaveTypeEntitlementModel, string, string, number, any, string, number];
/**
 * Service year end closing
 *
 * @export
 * @class YearEndClosingService
 */
@Injectable()
export class YearEndClosingService {
  /**
   *Creates an instance of YearEndClosingService.
   * @param {UserService} userService
   * @param {UserLeaveEntitlementDbService} userLeaveEntitlementDbService
   * @param {UserInfoDbService} userInfoDbService
   * @memberof YearEndClosingService
   */
  constructor(
    private readonly userService: UserService,
    private readonly userLeaveEntitlementDbService: UserLeaveEntitlementDbService,
    private readonly userInfoDbService: UserInfoDbService,
    private readonly leavetypeEntitlementDbService: LeavetypeEntitlementDbService,
    private readonly serviceYearCalcService: ServiceYearCalc,
    private readonly proratedMonthEndYearService: ProratedDateEndYearService,
    private readonly xmlParserService: XMLParserService,
    private readonly leaveEntitlementBaseService: LeaveEntitlementBaseService,
    private readonly userLeaveEntitlementSummaryDbService: UserLeaveEntitlementSummaryDbService
    // private readonly yearEndAssignEntitlementService: YearEndAssignEntitlementService
  ) { }
  /**
   * Method year end process
   *
   * @param {*} user
   * @returns {Observable<any>}
   * @memberof YearEndClosingService
   */
  public yearEndProcess(user: any, year: number): Observable<any> {

    const userFilter = ['(TENANT_GUID=' + user.TENANT_GUID + ')', '(DELETED_AT IS NULL)']

    let result = this.userInfoDbService.findByFilterV2([], userFilter)
      .pipe(
        map(res => { // check user active or resign
          let dataRes = this.checkUser(res);
          return dataRes;

        }), map(res => { // update status disable to resign user based on year
          let { resignUser, activeUser } = res;
          let resultDisable = this.disableProcess(user, resignUser);
          return { activeUser, resultDisable };

        }), map(res => { // get all leavetype detail policy
          let { resultDisable, activeUser } = res;
          let leavetypePolicy = this.leavetypeEntitlementDbService.findByFilterV2([], ['(DELETED_AT IS NULL)']);
          return { activeUser, resultDisable, leavetypePolicy };
        }), map(res => { // update user entitlement for active user
          let { activeUser, resultDisable, leavetypePolicy } = res;

          let resultEntitlement = this.checkEntitlement(activeUser, year);
          resultEntitlement.forEach(x => x.subscribe(
            data => {
              this.processPolicy(leavetypePolicy, x, year, user); //find all leave entitlement
            }, err => {
              console.log(err);
            }
          ));
          return { activeUser, leavetypePolicy };
        }), map(res => {
          let { activeUser, leavetypePolicy } = res;
          this.checkCarryForward(activeUser, leavetypePolicy, user, year);
          return res;
        })
      )
    return result;
  }

  public checkCarryForward(activeUser: UserInfoModel[], leavetypePolicy: Observable<any[]>, user: any, year: number) {

    let balanceLeave = this.userLeaveEntitlementSummaryDbService.findByFilterV2([], ['(TENANT_GUID = ' + user.TENANT_GUID + ')']);

    forkJoin(leavetypePolicy, balanceLeave).pipe(map(
      ([leavetypePolicyData, balanceLeaveData]) => {
        const resource = new Resource(new Array);
        balanceLeaveData.forEach(element => {

          let getLeavePolicy: LeaveTypeEntitlementModel = leavetypePolicyData.find(x => x.LEAVE_TYPE_GUID === element.LEAVE_TYPE_GUID);
          let policyLeave = this.xmlParserService.convertXMLToJson(getLeavePolicy.PROPERTIES_XML);
          let dayCF = policyLeave.levels.leaveEntitlement.carryForward;

          if (dayCF != 0 && element.BALANCE_DAYS > 0) {
            let dayAvailableCF = element.BALANCE_DAYS >= dayCF ? dayCF : element.BALANCE_DAYS;
            // console.log('assign CF : ' + dayAvailableCF);
            // console.log(activeUser);
            // activeUser.forEach(userActive => {
            //   console.log(userActive.USER_GUID + ' - ' + element.USER_GUID);
            //   if (userActive.USER_GUID == element.USER_GUID) {
            //     console.log('found u hahaha');
            //   }
            // });
            console.log(element.USER_GUID);
            // let userData: UserInfoModel = activeUser.find(x => 
            //   x.USER_GUID.toString() === element.USER_GUID.toString()
            // );
            // console.log(userData);
            this.assignNewYearEntitlement([resource, getLeavePolicy, element.USER_GUID, null, year, user, 'CF', dayAvailableCF]);
          }
        });

        return this.assignUserLeaveEntitlement(resource);
      }
    )).subscribe(
      data => {
        console.log('success assign carry forward');
      }, err => {
        console.log('error assign carry forward');
      }
    );
    return 'data';
  }









  public processPolicy(leavetypePolicy: Observable<any>, userEntitlement: Observable<any>, year: number, user: any) {
    let joinObserve = forkJoin(leavetypePolicy, userEntitlement);
    joinObserve.pipe(map(([res1, res2]) => {
      // console.log(res1);
      console.log(res2);
      if (res2.entitlement.length > 0) {
        const resource = new Resource(new Array);
        res2.entitlement.forEach(y => {
          if (!y.year.includes(year)) {
            let tempPolicy: LeaveTypeEntitlementModel = res1.find(x => x.ENTITLEMENT_GUID.toString() === y.id.toString());
            if (tempPolicy) {
              console.log('u here?');
              this.assignNewYearEntitlement([resource, tempPolicy, res2.userguid, res2.joindate, year, user, 'STD', 0]);
            }
          }
        });
        console.log(resource);

        return this.assignUserLeaveEntitlement(resource);

      } else {
        return 'user not assign';
      }

    })).subscribe(
      data => {
        return 'subs - success';
      }, err => {
        return 'subs - error';
      });

    return 'ok';
  }

  public assignUserLeaveEntitlement(resource) {
    return this.userLeaveEntitlementDbService.createByModel(resource, [], [], []).pipe(
      map(res => {
        if (res.status == 200) {
          return res.data.resource;
        }
      })).subscribe(
        data => {
          return 'success assign';
        }, err => {
          return 'failed assign'
        });
  }

  // resource: Resource, tempPolicy: LeaveTypeEntitlementModel, userguid: string, joindate: string, year: number, user: any, process: string, CFDays: number
  public assignNewYearEntitlement([resource, tempPolicy, userguid, joindate, year, user, process, CFdays]: userEntitlement) {
    // console.log(joindate);
    let entitlementDay = 0;
    if (joindate != null) {
      const dateOfJoin = new Date(joindate);
      // get the service year
      let serviceYear = this.serviceYearCalcService.calculateEmployeeServiceYear(dateOfJoin);
      // get policy leavetype
      const policy = this.xmlParserService.convertXMLToJson(tempPolicy.PROPERTIES_XML);
      // get entitled days from policy
      entitlementDay = this.leaveEntitlementBaseService.getEntitlementFromPolicy(policy, serviceYear);
    }

    let daysToAdd = 0;
    let CFFlag = 0; // assign CF initial 0 - means parent
    let PRFlag = 1; // assign Parent Flag 1 - means not child (not carry forward)

    if (process == 'STD') {
      daysToAdd = entitlementDay;
    } else if (process == 'CF') {
      daysToAdd = CFdays;
      CFFlag = 1;
      PRFlag = 0;
    }

    const data: UserLeaveEntitlementModel = new UserLeaveEntitlementModel;

    data.USER_LEAVE_ENTITLEMENT_GUID = v1();
    data.USER_GUID = userguid;
    data.LEAVE_TYPE_GUID = tempPolicy.LEAVE_TYPE_GUID;
    data.ENTITLEMENT_GUID = tempPolicy.ENTITLEMENT_GUID;
    data.YEAR = year;
    data.DAYS_ADDED = daysToAdd;
    data.CF_FLAG = CFFlag;
    data.PARENT_FLAG = PRFlag;
    // data.EXPIREDATE = null;
    // data.REMARKS = null;
    data.PROPERTIES_XML = tempPolicy.PROPERTIES_XML;
    data.CREATION_TS = new Date().toISOString();
    data.CREATION_USER_GUID = user.USER_GUID;
    // data.UPDATE_TS = null;
    // data.UPDATE_USER_GUID = null;
    data.TENANT_GUID = user.TENANT_GUID;
    data.ACTIVE_FLAG = 1;
    // data.DELETED_AT = null;

    resource.resource.push(data);

    return resource;
  }

  public checkEntitlement(activeUser, year): Observable<any>[] {
    let allArr = [];
    let usertemp;
    activeUser.forEach(element => {
      let tempArr = [];
      tempArr['userguid'] = element.USER_GUID;
      tempArr['joindate'] = element.JOIN_DATE;
      usertemp = this.getLeaveEntitlement(element.USER_GUID).pipe(map(res => {
        tempArr['entitlement'] = [];
        console.log(res);
        if (res.length > 0) {
          res.forEach(element => {
            let temp = tempArr['entitlement'].find(x => x.id === element.ENTITLEMENT_GUID);
            if (!temp) {
              tempArr['entitlement'].push({ "id": element.ENTITLEMENT_GUID, "year": [element.YEAR] });

            }
            else {
              temp.year.push(element.YEAR);
            }
          });
        }
        return tempArr;
      }))
      allArr.push(usertemp);
    });

    return allArr;
  }

  /**
   * Get leave entitlement
   *
   * @param {string} userguid
   * @returns {Observable<any>}
   * @memberof YearEndClosingService
   */
  public getLeaveEntitlement(userguid: string): Observable<any> {
    let userFilter = ['(USER_GUID=' + userguid + ')', '(PARENT_FLAG=1)'];
    console.log(userFilter);

    return this.userLeaveEntitlementDbService.findByFilterV2([], userFilter).pipe(
      map(res => {
        console.log(res);
        return res;
      }));
  }















  /**
   * Check if user has resignation date - we disable them
   *
   * @param {UserInfoModel[]} res
   * @returns
   * @memberof YearEndClosingService
   */
  public checkUser(res: UserInfoModel[]) {
    let userInfo: UserInfoModel[] = res;

    let resignUser = [];
    let activeUser = [];

    userInfo.forEach(element => {
      if (new Date(element.RESIGNATION_DATE).getFullYear() <= new Date().getFullYear() && element.RESIGNATION_DATE != null) {
        resignUser.push(element);
      } else {
        activeUser.push(element);
      }
    });

    return { resignUser, activeUser };
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
    userToDisable = '"2b93fc11-23d5-db42-dd9f-bb9499071156","7756ab98-e69e-48e1-5fc3-b7e30a157cf3"';
    const resource = new Resource(new Array);
    const data = new UserModel();

    data.ACTIVATION_FLAG = 0;
    data.UPDATE_TS = new Date().toISOString();
    data.UPDATE_USER_GUID = user.USER_GUID;

    resource.resource.push(data);

    return this.userService.updateByModel(resource, [], ['(USER_GUID IN (' + userToDisable + '))'], ['EMAIL']);
  }

}