import { Injectable } from '@nestjs/common';
import { ServiceYearCalc } from 'src/common/policy/entitlement-type/services/service-year-calculation-service/serviceYearCalc.service';
import { ProratedDateEndYearService } from 'src/common/policy/entitlement-type/services/leave-entitlement-type/proratedDateEndYear.service';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { Resource } from 'src/common/model/resource.model';
import { UserLeaveEntitlementModel } from '../model/user-leave-entitlement.model';
import { v1 } from 'uuid';
import moment = require('moment');
import { map } from 'rxjs/operators';
import { UserLeaveEntitlementDbService } from '../db/user-leave-entitlement.db.service';
import { of } from 'rxjs';

@Injectable()
export class UserEntitlementAssignPolicy {

  constructor(
    private readonly serviceYearCalcService: ServiceYearCalc,
    private readonly proratedMonthEndYearService: ProratedDateEndYearService,
    private readonly xmlParserService: XMLParserService,
    private readonly userLeaveEntitlementDbService: UserLeaveEntitlementDbService, ) { }

  /**
     * Method assign policy process
     *
     * @param {*} res
     * @param {*} user
     * @param {*} data
     * @returns
     * @memberof UserLeaveEntitlementService
     */
  public assignPolicyProcess(res, user, data) {

    // console.log('here' + res);
    // console.log(user);
    // console.log(data);

    const { length } = data.userId;
    const resource = new Resource(new Array());

    // console.log(length);
    for (let i = 0; i < length; i++) {
      // console.log(data.userId[i]);
      const user = res.userInfoResult.find(x => x.USER_GUID.toString() === data.userId[i].toString());
      // console.log(user);
      const dateOfJoin = new Date(user.JOIN_DATE);
      // get the service year
      const serviceYear = this.serviceYearCalcService.calculateEmployeeServiceYear(dateOfJoin);
      // console.log('svc-year' + serviceYear);

      // console.log(res.res[0].PROPERTIES_XML);

      const policy = this.xmlParserService.convertXMLToJson(res.res[0].PROPERTIES_XML);
      // console.log('pol' + policy);


      //get the entitlement days
      const entitlementDay = this.proratedMonthEndYearService.calculateEntitledLeave(dateOfJoin, serviceYear, policy);
      // console.log('ed' + entitlementDay);

      if (entitlementDay == 0 || entitlementDay == undefined) {
        return of(null);
      }

      // assign new policy to user
      const entitlementModel = new UserLeaveEntitlementModel();
      entitlementModel.USER_LEAVE_ENTITLEMENT_GUID = v1();
      entitlementModel.LEAVE_TYPE_GUID = data.leaveTypeId;
      entitlementModel.ENTITLEMENT_GUID = data.leaveEntitlementId;
      entitlementModel.USER_GUID = data.userId[i];

      entitlementModel.PARENT_FLAG = 1;
      entitlementModel.CF_FLAG = 0;
      entitlementModel.PROPERTIES_XML = res.res[0].PROPERTIES_XML;
      entitlementModel.YEAR = moment().year();
      entitlementModel.REMARKS = null;
      entitlementModel.ACTIVE_FLAG = 1;

      entitlementModel.TENANT_GUID = user.TENANT_GUID;
      entitlementModel.CREATION_USER_GUID = user.USER_GUID;

      entitlementModel.DAYS_ADDED = entitlementDay;



      resource.resource.push(entitlementModel);

    }

    // console.log(resource);

    // const dateOfJoin = new Date(res.userInfoResult.JOIN_DATE);
    // // get the service year
    // const serviceYear = this.serviceYearCalcService.calculateEmployeeServiceYear(dateOfJoin);

    // const policy = this.xmlParserService.convertXMLToJson(res.res.PROPERTIES_XML);

    // // //get the entitlement days
    // const entitlementDay = this.proratedMonthEndYearService.calculateEntitledLeave(dateOfJoin, serviceYear, policy);

    // if (entitlementDay == 0 || entitlementDay == undefined) {
    //     return of(null);
    // }

    // // assign new policy to user
    // const entitlementModel = new UserLeaveEntitlementModel();
    // entitlementModel.USER_LEAVE_ENTITLEMENT_GUID = v1();
    // entitlementModel.LEAVE_TYPE_GUID = data.leaveTypeId;
    // entitlementModel.ENTITLEMENT_GUID = data.leaveEntitlementId;
    // entitlementModel.USER_GUID = data.userId;

    // entitlementModel.PARENT_FLAG = 1;
    // entitlementModel.CF_FLAG = 0;
    // entitlementModel.PROPERTIES_XML = res.res.PROPERTIES_XML;
    // entitlementModel.YEAR = moment().year();
    // entitlementModel.REMARKS = 'this is remark';
    // entitlementModel.ACTIVE_FLAG = 1;

    // entitlementModel.TENANT_GUID = user.TENANT_GUID;
    // entitlementModel.CREATION_USER_GUID = user.USER_GUID;

    // entitlementModel.DAYS_ADDED = entitlementDay;

    // const resource = new Resource(new Array());

    // resource.resource.push(entitlementModel);

    return this.userLeaveEntitlementDbService.createByModel(resource, [], [], [])
      .pipe(map(res => {
        if (res.status == 200) {
          return res.data.resource;
        }
      }))
  }

}