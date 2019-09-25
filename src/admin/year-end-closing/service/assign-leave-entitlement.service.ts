import { Injectable } from '@nestjs/common';
import { AssignLeaveFunctionService } from './assign-leave-function.service';
import { Observable, forkJoin } from 'rxjs';
import { LeaveTypeEntitlementModel } from 'src/admin/leavetype-entitlement/model/leavetype_entitlement.model';
import { Resource } from 'src/common/model/resource.model';
import { map } from 'rxjs/operators';
import { LeavetypeEntitlementDbService } from 'src/admin/leavetype-entitlement/db/leavetype-entitlement.db.service';

@Injectable()
export class AssignLeaveEntitlementService {

  constructor(
    public leavetypeEntitlementDbService: LeavetypeEntitlementDbService,
    private readonly assignLeaveFunctionService: AssignLeaveFunctionService
  ) { }
  /**
   * Process policy for new year
   *
   * @param {Observable<any>} leavetypePolicy
   * @param {Observable<any>} userEntitlement
   * @param {number} year
   * @param {*} user
   * @returns
   * @memberof YearEndClosingService
   */
  public processPolicy(leavetypePolicy: Observable<any>, userEntitlement: Observable<any>, year: number, user: any) {
    let joinObserve = forkJoin(leavetypePolicy, userEntitlement);
    let assignETSuccess = [];
    let assignETFailed = [];
    joinObserve.pipe(map(([res1, res2]) => {

      if (res2.entitlement.length > 0) {
        const resource = new Resource(new Array);
        res2.entitlement.forEach(y => {
          if (!y.year.includes(year)) {
            let tempPolicy: LeaveTypeEntitlementModel = res1.find(x => x.ENTITLEMENT_GUID.toString() === y.id.toString());
            if (tempPolicy) {
              this.assignLeaveFunctionService.assignNewYearEntitlement([resource, tempPolicy, res2.userguid, res2.joindate, year, user, 'STD', 0, null]);
            }
          }
        });
        assignETSuccess.push(res2);
        this.assignLeaveFunctionService.assignUserLeaveEntitlement(resource);

      } else {
        assignETFailed.push(res2);
        // return 'user not assign';
      }
      return { assignETSuccess, assignETFailed };
    })).subscribe(
      data => {
        return 'subs - success';
      }, err => {
        return 'subs - error';
      });

    return 'ok';
  }





  /**
   * Check all entitlement assign previous year
   *
   * @param {*} activeUser
   * @returns {Observable<any>[]}
   * @memberof YearEndClosingService
   */
  public checkEntitlement(activeUser): Observable<any>[] {
    let allArr = [];
    let usertemp;
    activeUser.forEach(element => {
      let tempArr = [];
      tempArr['userguid'] = element.USER_GUID;
      tempArr['joindate'] = element.JOIN_DATE;
      usertemp = this.assignLeaveFunctionService.getLeaveEntitlement(element.USER_GUID, ['(PARENT_FLAG=1)']).pipe(map(res => {
        tempArr['entitlement'] = [];

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

}