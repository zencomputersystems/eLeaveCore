import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { UserLeaveEntitlementDbService } from 'src/api/userprofile/db/user-leave-entitlement.db.service';
import { UserInfoDbService } from '../holiday/db/user-info.db.service';
import { UserInfoModel } from '../user-info/model/user-info.model';
import { Resource } from 'src/common/model/resource.model';
import { UserModel } from '../user/model/user.model';


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
    private readonly userInfoDbService: UserInfoDbService
  ) { }
  /**
   * Method year end process
   *
   * @param {*} user
   * @returns {Observable<any>}
   * @memberof YearEndClosingService
   */
  public yearEndProcess(user: any): Observable<any> {
    // console.log('hello there');
    // const filters = ['(TENANT_GUID=58a035ca-b22f-1b4e-79c6-7e13ec15d2d2)'];
    // const userFilter = ['(TENANT_GUID=' + req.user.TENANT_GUID + ')']
    const userFilter = ['(TENANT_GUID=' + user.TENANT_GUID + ')', '(DELETED_AT IS NULL)']
    let result = this.userInfoDbService.findByFilterV2([], userFilter)
      .pipe(
        map(res => { // check user active or resign
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
        }), map(res => { // update status disable to resign user based on year
          let userToDisable: UserInfoModel[] = res.resignUser;
          let activeUser = res.activeUser;
          let disableUserGroup = '';
          userToDisable.forEach(element => {
            if (disableUserGroup == '') { disableUserGroup = '"' + element.USER_GUID + '"'; }
            else { disableUserGroup = disableUserGroup + ',"' + element.USER_GUID + '"'; }
          });
          let resultDisable = this.disableUser(user, disableUserGroup);
          return { activeUser, resultDisable };
        }), map(res => { // update user entitlement for active user
          res.resultDisable.subscribe(
            data => {
              console.log(data.data.resource);
            }, err => {
              console.log(err);
            }
          );
          // res.activeUser
          res.activeUser.forEach(element => {

            let entitlement = this.getLeaveEntitlement(element.USER_GUID).subscribe(
              data => {
                if (data.length > 0) {
                  // console.log('_______________________________________________________________');
                  // console.log(data);
                }
              }, err => {
                // console.log(err);
              }
            );
            // userArray.push(
            //   new UserprofileListDTO(element, new Access()));

          });
        })
      )
    // .subscribe(
    //   data => {
    //     console.log(data[0].USER_GUID);
    //     return data;
    //   }, err => {
    //     // console.log(err);
    //     return err;
    //   }
    // );

    // console.log(result);
    return result;
    // return of('userList');
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
        // console.log('in function leave');
        // console.log(res);
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