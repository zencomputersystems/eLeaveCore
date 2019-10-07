import { Injectable } from '@nestjs/common';
import { UserLeaveEntitlementDbService } from 'src/api/userprofile/db/user-leave-entitlement.db.service';
import { ServiceYearCalc } from 'src/common/policy/entitlement-type/services/service-year-calculation-service/serviceYearCalc.service';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { LeaveEntitlementBaseService } from 'src/common/policy/entitlement-type/services/leave-entitlement-type/leave-entitlement-base.service';
import { UserLeaveEntitlementModel } from 'src/api/userprofile/model/user-leave-entitlement.model';
import { v1 } from 'uuid';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Resource } from 'src/common/model/resource.model';
import { LeaveTypeEntitlementModel } from '../../leavetype-entitlement/model/leavetype_entitlement.model';

type userEntitlement = [Resource, LeaveTypeEntitlementModel, string, string, number, any, string, number, Date];
/**
 * Service assign leave function
 *
 * @export
 * @class AssignLeaveFunctionService
 */
@Injectable()
export class AssignLeaveFunctionService {

  /**
   *Creates an instance of AssignLeaveFunctionService.
   * @param {UserLeaveEntitlementDbService} userLeaveEntitlementDbService user leave entitlement db service
   * @param {ServiceYearCalc} serviceYearCalcService service year calculation
   * @param {XMLParserService} xmlParserService xml parser servicxe
   * @param {LeaveEntitlementBaseService} leaveEntitlementBaseService leave entitlement db service
   * @memberof AssignLeaveFunctionService
   */
  constructor(
    private readonly userLeaveEntitlementDbService: UserLeaveEntitlementDbService,
    private readonly serviceYearCalcService: ServiceYearCalc,
    private readonly xmlParserService: XMLParserService,
    private readonly leaveEntitlementBaseService: LeaveEntitlementBaseService
  ) { }

  // resource: Resource, tempPolicy: LeaveTypeEntitlementModel, userguid: string, joindate: string, year: number, user: any, process: string, CFDays: number
  /**
   * Assign new year entitlement
   *
   * @param {userEntitlement} [resource, tempPolicy, userguid, joindate, year, user, process, CFdays, dateForfeitCF]
   * @returns
   * @memberof YearEndClosingService
   */
  public assignNewYearEntitlement([resource, tempPolicy, userguid, joindate, year, user, process, CFdays, dateForfeitCF]: userEntitlement) {

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
    data.EXPIREDATE = dateForfeitCF;
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


  /**
   * Assign user for new year leave entitlement
   *
   * @param {*} resource
   * @returns
   * @memberof YearEndClosingService
   */
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

  /**
   * Get leave entitlement
   *
   * @param {string} userguid
   * @returns {Observable<any>}
   * @memberof YearEndClosingService
   */
  public getLeaveEntitlement(userguid: string, extraCond: string[]): Observable<any> {
    let userFilter = ['(USER_GUID=' + userguid + ')'];
    userFilter = userFilter.concat(extraCond);
    return this.userLeaveEntitlementDbService.findByFilterV2([], userFilter).pipe(
      map(res => {
        return res;
      }));
  }

}