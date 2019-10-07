import { Injectable } from '@nestjs/common';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { UserLeaveEntitlementSummaryDbService } from 'src/api/userprofile/db/user-leave-summary.db.service';
import { ViewUserProfileListModel } from 'src/api/userprofile/model/view_userprofile_list.model';
import { Observable, forkJoin } from 'rxjs';
import { Resource } from 'src/common/model/resource.model';
import { GeneralLeavePolicyModel } from '../../general-leave-policy/model/general-leave-policy.model';
import { LeaveTypeEntitlementModel } from '../../leavetype-entitlement/model/leavetype_entitlement.model';
import { AssignLeaveFunctionService } from './assign-leave-function.service';
import { map } from 'rxjs/operators';

/**
 * Service assign carry forward
 *
 * @export
 * @class AssignCarryForwardService
 */
@Injectable()
export class AssignCarryForwardService {

  /**
   *Creates an instance of AssignCarryForwardService.
   * @param {XMLParserService} xmlParserService xml parser service
   * @param {UserLeaveEntitlementSummaryDbService} userLeaveEntitlementSummaryDbService user leave entitlement summary db service
   * @param {AssignLeaveFunctionService} assignLeaveFunctionService  assign leave function service
   * @memberof AssignCarryForwardService
   */
  constructor(
    private readonly xmlParserService: XMLParserService,
    private readonly userLeaveEntitlementSummaryDbService: UserLeaveEntitlementSummaryDbService,
    private readonly assignLeaveFunctionService: AssignLeaveFunctionService
  ) { }


  /**
   * Check carry forward if any
   *
   * @param {[ViewUserProfileListModel[], Observable<any[]>, Observable<any[]>, any, number]} [activeUser, leavetypePolicy, generalPolicy, user, year]
   * @returns
   * @memberof AssignCarryForwardService
   */
  public checkCarryForward([activeUser, leavetypePolicy, generalPolicy, user, year]: [ViewUserProfileListModel[], Observable<any[]>, Observable<any[]>, any, number]) {

    let balanceLeave = this.userLeaveEntitlementSummaryDbService.findByFilterV2([], ['(TENANT_GUID = ' + user.TENANT_GUID + ')']);
    let assignSuccess = [];
    let assignFailed = [];

    forkJoin(leavetypePolicy, balanceLeave, generalPolicy).pipe(map(
      ([leavetypePolicyData, balanceLeaveData, generalPolicyData]) => {
        // const resource = new Resource(new Array);
        activeUser.forEach(userActive => {
          let resource = new Resource(new Array);
          let entitlement = balanceLeaveData.filter(x => x.USER_GUID === userActive.USER_GUID);
          let generalPolicy: GeneralLeavePolicyModel = generalPolicyData.find(x => x.TENANT_COMPANY_GUID === userActive.TENANT_COMPANY_GUID);
          let generalPolicyDetail = this.xmlParserService.convertXMLToJson(generalPolicy.PROPERTIES_XML);
          let dateForfeitCF: Date = null;

          if (generalPolicyDetail.forfeitCFLeave != null) {
            if (generalPolicyDetail.forfeitCFLeave.value == true) {
              dateForfeitCF = new Date(year + '-' + generalPolicyDetail.forfeitCFLeave.month + '-' + generalPolicyDetail.forfeitCFLeave.day);
            }
          }

          if (entitlement.length > 0) {
            this.processAssign([entitlement, leavetypePolicyData, year, resource, user, dateForfeitCF]);

            assignSuccess.push(userActive.FULLNAME);
          } else {
            assignFailed.push(userActive.FULLNAME);
          }
        });

        return { assignSuccess, assignFailed };;
      }
    )).subscribe(
      data => {
        return 'success assign carry forward';
      }, err => {
        return 'error assign carry forward';
      }
    );
    return 'data';
  }

  /**
   * Process assign
   *
   * @param {*} [entitlement, leavetypePolicyData, year, resource, user, dateForfeitCF]
   * @memberof AssignCarryForwardService
   */
  public processAssign([entitlement, leavetypePolicyData, year, resource, user, dateForfeitCF]) {
    entitlement.forEach(element => {
      let getLeavePolicy: LeaveTypeEntitlementModel = leavetypePolicyData.find(x => x.LEAVE_TYPE_GUID === element.LEAVE_TYPE_GUID);
      let policyLeave = this.xmlParserService.convertXMLToJson(getLeavePolicy.PROPERTIES_XML);
      let dayCF = policyLeave.levels.leaveEntitlement.carryForward;


      if (dayCF != 0 && element.BALANCE_DAYS > 0) {
        // if balance more than CF, get CF, else get balance if greater than 0
        let dayAvailableCF = element.BALANCE_DAYS >= dayCF ? dayCF : element.BALANCE_DAYS;

        let findCF = this.assignLeaveFunctionService.getLeaveEntitlement(element.USER_GUID, ['(CF_FLAG=1)', '(LEAVE_TYPE_GUID=' + element.LEAVE_TYPE_GUID + ')', '(YEAR=' + year + ')']).pipe(map(res => {
          if (res.length > 0) {
            return 'Already assigned CF leave';
          } else {
            this.assignLeaveFunctionService.assignNewYearEntitlement([resource, getLeavePolicy, element.USER_GUID, null, year, user, 'CF', dayAvailableCF, dateForfeitCF]);
            this.assignLeaveFunctionService.assignUserLeaveEntitlement(resource);
            return 'Success Assign CF Leave';
          }
        })).subscribe(
          data => {
            return 'Success CF assignnnnn';
          }, err => {
            return 'Failed CF assignnnnn';
          }
        );

      }
    });
  }



}