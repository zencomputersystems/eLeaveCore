import { Injectable } from '@nestjs/common';
import { Observable, forkJoin, of } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { UserprofileDbService } from 'src/api/userprofile/db/userprofile.db.service';
import { GenerateNewCalendarService } from './service/generate-new-calendar.service';
import { AssignLeaveEntitlementService } from './service/assign-leave-entitlement.service';
import { DisableResignUser } from './service/disable-resign-user.service';

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
   * @param {UserprofileDbService} userprofileDbService Get all user list
   * @param {GenerateNewCalendarService} generateNewCalendarService Create new year calendar
   * @param {AssignLeaveEntitlementService} assignLeaveEntitlementService Assign current year leave entitlement to new year
   * @param {DisableResignUser} disableResignUser Disable resign user, also attach with carry forward service (refactor)
   * @memberof YearEndClosingService
   */
  constructor(
    private readonly userprofileDbService: UserprofileDbService,
    private readonly generateNewCalendarService: GenerateNewCalendarService,
    private readonly assignLeaveEntitlementService: AssignLeaveEntitlementService,
    private readonly disableResignUser: DisableResignUser
  ) { }
  /**
   * Method year end process
   *
   * @param {*} user
   * @returns {Observable<any>}
   * @memberof YearEndClosingService
   */
  public yearEndProcess(user: any, year: number): Observable<any> {

    // const userFilter = ['(TENANT_GUID=' + user.TENANT_GUID + ')', '(DELETED_AT IS NULL)']
    const userFilter = ['(TENANT_GUID=' + user.TENANT_GUID + ')']

    let result = this.userprofileDbService.findByFilterV2([], userFilter)
      .pipe(
        map(res => {
          // check user active or resign
          let dataRes = this.disableResignUser.checkUser(res);

          // dataRes.resignUser = this.trimData(dataRes.resignUser);
          // dataRes.activeUser = this.trimData(dataRes.activeUser);
          // dataRes.disabledUser = this.trimData(dataRes.disabledUser);

          return dataRes;

        }), map(res => {
          // update status disable to resign user based on year
          let { resignUser, activeUser, disabledUser } = res;
          // let resultDisable = 

          // temp
          // this.disableResignUser.disableProcess(user, resignUser)
          //   .subscribe(
          //     data => {
          //       return 'Successfully disabled';
          //     }, err => {
          //       return 'Failed to disable';
          //     });

          let disableResult = this.disableResignUser.disableProcess(user, resignUser);

          return { resignUser, disabledUser, activeUser, disableResult };
        })
        , map(res => {
          // get all leavetype detail policy
          let { resignUser, disabledUser, activeUser, disableResult } = res;
          let leavetypePolicy = this.assignLeaveEntitlementService.leavetypeEntitlementDbService.findByFilterV2([], ['(DELETED_AT IS NULL)']);
          return { resignUser, disabledUser, activeUser, disableResult, leavetypePolicy };

        })
        , map(res => {
          // update user entitlement for active user
          let { resignUser, disabledUser, activeUser, disableResult, leavetypePolicy } = res;

          let resultEntitlement = this.assignLeaveEntitlementService.checkEntitlement(activeUser);

          // temp
          // resultEntitlement.forEach(x => x.subscribe(
          //   data => {
          //     // this.processPolicy(leavetypePolicy, x, year, user); //find all leave entitlement
          //     return 'Success assign entitlement';
          //   }, err => {
          //     return 'Failed assign entitlement';
          //   }
          // ));

          resultEntitlement.forEach(x => x.subscribe(
            data => {
              // this.processPolicy(leavetypePolicy, x, year, user); //find all leave entitlement
              return 'Success assign entitlement';
            }, err => {
              return 'Failed assign entitlement';
            }
          ));

          return { resignUser, disabledUser, activeUser, disableResult, leavetypePolicy };

        })
        , map(res => {
          // get general leave policy for company
          let { resignUser, disabledUser, activeUser, disableResult, leavetypePolicy } = res;
          let generalPolicy = this.disableResignUser.generalLeavePolicyService.findAll(user.TENANT_GUID);
          return { resignUser, disabledUser, activeUser, disableResult, leavetypePolicy, generalPolicy };

        })
        , map(res => {
          // assign carry forward entitlement
          let { resignUser, disabledUser, activeUser, disableResult, leavetypePolicy, generalPolicy } = res;
          // temp
          this.disableResignUser.assignCarryForwardService.checkCarryForward([activeUser, leavetypePolicy, generalPolicy, user, year]);

          // let finalRes = [];
          // finalRes['Disable user'] = resultDisable;
          // return finalRes;
          // let tmp = [];

          // res.resignUser = this.trimData(res.resignUser);
          // res.activeUser = this.trimData(res.activeUser);
          // res.disabledUser = this.trimData(res.disabledUser);

          return { resignUser, activeUser, disabledUser, disableResult, leavetypePolicy, generalPolicy };

        }), mergeMap(res => {
          let { resignUser, disabledUser, activeUser, disableResult, leavetypePolicy, generalPolicy } = res;
          this.generateNewCalendarService.generateNewCalendar(user, year - 1);
          // return res;
          // return { resignUser, disabledUser, activeUser, disableResult, leavetypePolicy, generalPolicy };
          // return generalPolicy;
          return forkJoin(of(resignUser), of(disabledUser), of(activeUser), leavetypePolicy, generalPolicy);
        })
      )

    return result;
  }

  // public trimData(dataArr: string[]) {
  //   const keyDelete = ["TENANT_GUID", "TENANT_COMPANY_GUID", "USER_INFO_GUID", "DESIGNATION", "DEPARTMENT", "DIVISION", "BRANCH", "ATTACHMENT_ID", "STATUS_ACTIVATION", "RESIGNATION_DATE", "ACTIVATION_FLAG", "JOIN_DATE"]
  //   dataArr.forEach(userResign => {
  //     keyDelete.forEach(keyTemp => {
  //       delete userResign[keyTemp];
  //     });
  //   });
  //   return dataArr;
  // }

}