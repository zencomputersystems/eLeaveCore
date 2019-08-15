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
    private readonly yearEndAssignEntitlementService: YearEndAssignEntitlementService
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

          let resultEntitlement = this.checkEntitlement(activeUser);
          resultEntitlement.forEach(x => x.subscribe(
            data => {
              this.processPolicy(leavetypePolicy, x, year, user); //find all leave entitlement
            }, err => {
              console.log(err);
            }
          ));
          return activeUser;
        })
      )
    return result;
  }

  public processPolicy(leavetypePolicy: Observable<any>, userEntitlement: Observable<any>, year: number, user: any) {
    let joinObserve = forkJoin(leavetypePolicy, userEntitlement);
    joinObserve.pipe(map(([res1, res2]) => {
      if (res2.entitlement.length > 0) {
        res2.entitlement.forEach(y => {
          let tempPolicy = res1.find(x => x.ENTITLEMENT_GUID.toString() === y.toString());
          if (tempPolicy) {
            this.assignNewYearEntitlement(tempPolicy, res2.userguid, year, user);
          }
        });
      } else {
        console.log(res2.userguid + ' - user was not assigned with any entitlement');
      }
    })).subscribe();

    return 'ok';
  }

  public assignNewYearEntitlement(tempPolicy, userguid, year, user) {
    // year = year + 1;
    // console.log(userguid);
    // console.log(year);
    // console.log(userguid + ' - ' + tempPolicy + ' - ' + tempPolicy);
    // console.log(tempPolicy);
    let data = new AssignLeavePolicyDTO();
    data.leaveEntitlementId = tempPolicy.ENTITLEMENT_GUID;
    data.leaveTypeId = tempPolicy.LEAVE_TYPE_GUID;
    // data.userId.push(userguid);
    data.userId = [userguid];

    this.yearEndAssignEntitlementService.assignEntitlement(user, data);


  }

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

  public disableProcess(user, resignUser) {
    let disableUserGroup = '';
    resignUser.forEach(element => {
      if (disableUserGroup == '') { disableUserGroup = '"' + element.USER_GUID + '"'; }
      else { disableUserGroup = disableUserGroup + ',"' + element.USER_GUID + '"'; }
    });
    let resultDisable = this.disableUser(user, disableUserGroup);
    return resultDisable;
  }

  public checkEntitlement(activeUser): Observable<any>[] {
    let allArr = [];
    let usertemp;
    activeUser.forEach(element => {
      let tempArr = [];
      tempArr['userguid'] = element.USER_GUID;
      usertemp = this.getLeaveEntitlement(element.USER_GUID).pipe(map(res => {
        tempArr['entitlement'] = [];
        if (res.length > 0) {
          res.forEach(element => {
            tempArr['entitlement'].push(element.ENTITLEMENT_GUID);
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
    const userFilter = ['(USER_GUID=' + userguid + ')', '(PARENT_FLAG=1)'];
    return this.userLeaveEntitlementDbService.findByFilterV2([], userFilter).pipe(
      map(res => {
        return res;
      }));
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