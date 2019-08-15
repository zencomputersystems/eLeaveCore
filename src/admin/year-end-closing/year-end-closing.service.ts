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
    private readonly leavetypeEntitlementDbService: LeavetypeEntitlementDbService
  ) { }
  /**
   * Method year end process
   *
   * @param {*} user
   * @returns {Observable<any>}
   * @memberof YearEndClosingService
   */
  public yearEndProcess(user: any): Observable<any> {

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

          let resultEntitlement = this.checkEntitlement(activeUser, leavetypePolicy);
          resultEntitlement.forEach(x => x.subscribe(
            data => {
              this.processPolicy(leavetypePolicy, x);
            }, err => {
              console.log(err);
            }
          ));
          // let temp =
          // return forkJoin(leavetypePolicy, resultEntitlement[0]);
          // return resultDisable.subscribe(
          //   data => {
          //     console.log(data.data.resource);
          //   }, err => {
          //     console.log(err);
          //   }
          // );
          // return forkJoin(leavetypePolicy, resultEntitlement);

          return activeUser;
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

  public processPolicy(leavetypePolicy: Observable<any>, userEntitlement: Observable<any>) {
    let joinObserve = forkJoin(leavetypePolicy, userEntitlement);
    // console.log('in function process policy');
    joinObserve.pipe(map(([res1, res2]) => {
      // console.log(res2);
      if (res2.entitlement.length > 0) {
        res2.entitlement.forEach(y => {
          let tempPolicy = res1.find(x => x.ENTITLEMENT_GUID.toString() === y.toString());
          if (tempPolicy) {
            console.log(res2.userguid + ' - ' + tempPolicy.ENTITLEMENT_GUID + ' - ' + tempPolicy.LEAVE_TYPE_GUID);
          }
        });
      } else {
        console.log(res2.userguid + ' - user was not assigned with any entitlement');
      }
      // console.log(res1[0]);
      // console.log(res2);
    })).subscribe(
      data => {
        // console.log(data);
      }, err => {
        // console.log(err);
      }
    );
    return 'ok';
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

  public checkEntitlement(activeUser, leavetypePolicy): Observable<any>[] {
    let allArr = [];
    let usertemp;
    activeUser.forEach(element => {
      let tempArr = [];
      tempArr['userguid'] = element.USER_GUID;
      usertemp = this.getLeaveEntitlement(element.USER_GUID).pipe(map(res => {
        tempArr['entitlement'] = [];
        if (res.length > 0) {
          // console.log('____________________________________________________');
          res.forEach(element => {
            // console.log(element.USER_LEAVE_ENTITLEMENT_GUID);
            tempArr['entitlement'].push(element.ENTITLEMENT_GUID);
          });
        }
        // else {
        //   console.log('else');
        // }
        // console.log(tempArr);
        return tempArr;

      }))
      //.subscribe(data => { console.log('here data : ' + data); });
      // console.log(tempArr);
      allArr.push(usertemp);
    });


    // console.log(allArr);
    return allArr;
    // return of(allArr);

    // return leavetypePolicy.pipe(map(res => {
    //   console.log('in checkentitlement');
    //   // console.log(res);
    //   return res;
    // }), map(res => {
    //   // console.log(res);
    //   // let leavePolicy:Array<LeaveTypeEntitlementModel>;
    //   let leavePolicy = res;

    //   // let userEntitlement = 
    //   // activeUser.forEach(element => {
    //   //   return this.getLeaveEntitlement(element.USER_GUID).pipe(map(res => {
    //   //     if (res.length > 0) {
    //   //       console.log('____________________________________________________');
    //   //       res.forEach(element => {
    //   //         console.log(element.USER_LEAVE_ENTITLEMENT_GUID);
    //   //       });
    //   //     }
    //   //     else {
    //   //       console.log('else');
    //   //     }
    //   //   }))
    //   //     .subscribe(
    //   //       data => {
    //   //         return data;
    //           //     // if (data.length > 0) {
    //           //     //   console.log('____________________________________________________');
    //           //     //   // console.log(data);
    //           //     //   data.forEach(element => {
    //           //     //     console.log(element.USER_LEAVE_ENTITLEMENT_GUID);
    //           //     //   });
    //           //     // }
    //           //     // else {
    //           //     //   console.log('else');
    //           //     //   console.log(element.USER_LEAVE_ENTITLEMENT_GUID);
    //           //     // }
    //         }, err => {
    //           //     // console.log(err);
    //         }
    //       );
    //   });

    //   console.log('before entering map');
    //   console.log(leavePolicy);
    //   console.log(userEntitlement);

    //   return { leavePolicy, userEntitlement }
    // }), map(res => {
    //   // let {leavePolicy,userEntitlement} = res;
    //   // console.log(leavePolicy);
    //   // console.log(userEntitlement);
    //   console.log('im hereeee');
    //   return res;
    // }))
    //   .subscribe(
    //     //   data=>{

    //     //   },err=>{

    //     //   }
    //   );
  }

  // public getuserLeaveEntitlement(element):Observable<any>{
  //   return this.getLeaveEntitlement(element.USER_GUID).pipe(map(res => {
  //     if (res.length > 0) {
  //       console.log('____________________________________________________');
  //       res.forEach(element => {
  //         console.log(element.USER_LEAVE_ENTITLEMENT_GUID);
  //       });
  //     }
  //     else {
  //       console.log('else');
  //     }
  //   }))
  // }

  // public getLeavetypeDetail(): Observable<any> {
  //   let result = this.leavetypeEntitlementDbService.findByFilterV2([], ['(DELETED_AT IS NULL)']).subscribe(
  //     data => {
  //       // console.log(data);
  //       return data;
  //     }, err => {
  //       return err;
  //     }
  //   )
  //   return of(result);
  // }

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