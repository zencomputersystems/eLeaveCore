import { Injectable } from '@nestjs/common';
import { Observable, of, forkJoin } from 'rxjs';
import { map, mergeMap, filter } from 'rxjs/operators';
import { RoleDbService } from '../role/db/role.db.service';
import { WorkingHoursDbService } from '../working-hours/db/working-hours.db.service';
import { CalendarProfileDbService } from '../holiday/db/calendar-profile-db.service';
import { HolidayDbService } from '../holiday/db/holiday.db.service';
import { Resource } from '../../common/model/resource.model';
import { CreateRoleModel } from '../role/model/create-role.model';
import { v1 } from 'uuid';
import { roleMock } from './mock/role.mock';
import { CreateWorkingHoursModel } from '../working-hours/model/create-working-hours.model';
import { workingHoursMock } from './mock/working-hours.mock';
import { CreateHolidayModel } from '../holiday/model/create-holiday.model';
import { LeavetypeService } from '../leavetype/leavetype.service';
import { LeavetypeEntitlementDbService } from 'src/admin/leavetype-entitlement/db/leavetype-entitlement.db.service';
import { leavetypeMock } from './mock/leavetype.mock';
import { LeaveTypeModel } from '../leavetype/model/leavetype.model';
import { LeaveTypeEntitlementModel } from '../leavetype-entitlement/model/leavetype_entitlement.model';
import { runServiceCallback } from 'src/common/helper/basic-functions';
import { CreateHolidayDetailsModel } from '../holiday/model/create-holiday-details.model';
import * as ls from "local-storage";
import { ProfileDefaultDbService } from '../profile-default/profile-default.db.service';
import { UserInfoService } from '../user-info/user-info.service';
import { UserInfoModel } from '../user-info/model/user-info.model';
import { UserLeaveEntitlementModel } from '../../api/userprofile/model/user-leave-entitlement.model';
import { UserLeaveEntitlementDbService } from '../../api/userprofile/db/user-leave-entitlement.db.service';
import { ServiceYearCalc } from 'src/common/policy/entitlement-type/services/service-year-calculation-service/serviceYearCalc.service';
import { ProratedDateEndYearService } from 'src/common/policy/entitlement-type/services/leave-entitlement-type/proratedDateEndYear.service';
import moment = require('moment');

/** XMLparser from zen library  */
var { convertJsonToXML, convertXMLToJson } = require('@zencloudservices/xmlparser');
@Injectable()
export class DefaultProfileService {
  constructor(
    private readonly roleDbService: RoleDbService,
    private readonly workingHourDbService: WorkingHoursDbService,
    private readonly calendarProfileDbService: CalendarProfileDbService,
    private readonly holidayDbService: HolidayDbService,
    private readonly leavetypeService: LeavetypeService,
    private readonly leavetypeEntitlementDbService: LeavetypeEntitlementDbService,
    private readonly userinfoService: UserInfoService,
    private readonly userLeaveEntitlementDbService: UserLeaveEntitlementDbService,
    private readonly serviceYearCalcService: ServiceYearCalc,
    private readonly proratedMonthEndYearService: ProratedDateEndYearService
  ) { }
  public createDefaultProfile(tenantId: string): Observable<any> {
    return this.createRoleProfile(tenantId).pipe(
      mergeMap(res => {
        let whProfile = this.createWorkingHourProfile(tenantId);
        // let { leavetypeProcess, leaveEntitlementProcess } = this.createLeavetype(tenantId);
        let leavetypeCreate = this.createLeavetype(tenantId);
        let { calendarDetails, calendarProfiles } = this.createCalendarProfile(tenantId);

        // let testCalendar = forkJoin(leavetypeProcess, leaveEntitlementProcess).subscribe(
        // let testCalendar = leavetypeCreate.subscribe(
        //   data => { return data; },
        //   err => { return err.response.data.error.context.resource[0].message; }
        // );

        return forkJoin(of(res), whProfile, calendarProfiles, calendarDetails, leavetypeCreate);
        // return of(tenantId);
      })
    )

  }

  private createRoleProfile(tenantId: string): Observable<any> {
    let resource = new Resource(new Array);
    let data = new CreateRoleModel();

    data.ROLE_GUID = v1();
    data.TENANT_GUID = tenantId;
    data.CODE = 'Default role profile';
    data.DESCRIPTION = 'Default role profile';
    data.PROPERTIES_XML = convertJsonToXML(roleMock);

    resource.resource.push(data);

    return this.roleDbService.createByModel(resource, ['ROLE_GUID', 'CODE', 'DESCRIPTION'], [], []).pipe(
      map(res => {
        return res.data.resource;
      })
    );

    // return of(tenantId);
  }

  private createWorkingHourProfile(tenantId: string): Observable<any> {
    let resource = new Resource(new Array);
    let data = new CreateWorkingHoursModel();

    data.WORKING_HOURS_GUID = v1();
    data.TENANT_GUID = tenantId;
    data.CODE = 'Default working hours profile';
    data.DESCRIPTION = 'Default working hours profile';
    data.PROPERTIES_XML = convertJsonToXML(workingHoursMock);

    resource.resource.push(data);

    return this.workingHourDbService.createByModel(resource, ['WORKING_HOURS_GUID', 'CODE', 'DESCRIPTION'], [], []).pipe(
      map(res => {
        return res.data.resource;
      })
    );
    // return of(tenantId);
  }
  private createCalendarProfile(tenantId: string) {
    const resource = new Resource(new Array);
    const data = new CreateHolidayModel();

    data.CALENDAR_GUID = v1();
    data.TENANT_GUID = tenantId;
    data.CODE = 'Default';

    let filterObj = {};
    filterObj['year'] = new Date().getFullYear();
    filterObj['country'] = 'MY';
    filterObj['region'] = '';

    data.FILTER_CRITERIA = convertJsonToXML(filterObj);

    resource.resource.push(data);

    let calendarDetails = this.calendarProcess([tenantId, data.CALENDAR_GUID]);

    let calendarProfiles = this.holidayDbService.createByModel(resource, ['CALENDAR_GUID', 'CODE', 'FILTER_CRITERIA'], [], []).pipe(
      map(res => {
        return res.data.resource;
      })
    );

    return { calendarDetails, calendarProfiles };

    // return of(tenantId);
  }

  private createLeavetype(tenantId) {
    let resource = new Resource(new Array);
    let resource2 = new Resource(new Array);
    leavetypeMock.forEach(element => {
      let data = new LeaveTypeModel();

      data.LEAVE_TYPE_GUID = v1();
      data.TENANT_GUID = tenantId;
      data.ABBR = element.abbr;
      data.CODE = element.code;
      data.DESCRIPTION = element.description;
      data.ACTIVE_FLAG = 1;

      resource.resource.push(data);

      this.createLeaveEntitlement([element, data, resource2])
    });

    let leavetypeProcess = this.leavetypeService.createByModel(resource, ['LEAVE_TYPE_GUID', 'CODE'], [], []).pipe(
      map(res => {
        return res.data.resource;
      })
    );
    let leaveEntitlementProcess = this.leavetypeEntitlementDbService.createByModel(resource2, ['ENTITLEMENT_GUID', 'LEAVE_TYPE_GUID', 'CODE'], [], []).pipe(
      map(res => {
        return res.data.resource;
      })
    );

    let leaveTypeCreate = this.leavetypeService.createByModel(resource, ['LEAVE_TYPE_GUID', 'CODE'], [], []).pipe(
      mergeMap(res => {
        return this.leavetypeEntitlementDbService.createByModel(resource2, ['ENTITLEMENT_GUID', 'LEAVE_TYPE_GUID', 'CODE'], [], [])
        // return res.data.resource;
      }), map(res => {
        return res.data.resource;
      })
    )

    return leaveTypeCreate;

    // return { leavetypeProcess, leaveEntitlementProcess };
  }


  private createLeaveEntitlement([element, data, resource2]) {
    let dataEntitlement = new LeaveTypeEntitlementModel();
    dataEntitlement.ENTITLEMENT_GUID = v1();
    dataEntitlement.LEAVE_TYPE_GUID = data.LEAVE_TYPE_GUID;
    dataEntitlement.TENANT_GUID = data.TENANT_GUID;
    dataEntitlement.TENANT_COMPANY_GUID = '';
    dataEntitlement.CODE = data.CODE + ' Entitlement';
    dataEntitlement.DESCRIPTION = data.DESCRIPTION;
    dataEntitlement.PROPERTIES_XML = convertJsonToXML(element.property);
    dataEntitlement.ACTIVE_FLAG = 1;

    resource2.resource.push(dataEntitlement);

    return resource2;
  }

  private calendarProcess([tenantId, calendarId]: [string, string]) {

    let method: Observable<any>;

    let dataTemp = ls.get<any>('calendarTemp');

    if (dataTemp != null) {
      let resource = new Resource(new Array);
      this.assignLeaveToCalendar([dataTemp, calendarId, resource]);

      method = this.calendarProfileDbService.createByModel(resource, ['CALENDAR_DETAILS_GUID', 'CALENDAR_GUID', 'YEAR'], [], []).pipe(map(res => {
        return res.data.resource;
      }));

    } else {

      var dt = new Date();
      let countryCalendar = 'my';
      let countryLink = '&country=my';
      let yearLink = '&year=' + dt.getFullYear();
      let locationLink = '';
      let monthLink = '';
      let localNational = '&type=local,national';

      let arrKey = ['29106b407bdd770140057e044bcb3db0d64a3a51', 'fc56e1848bee6b48e3af29bcb042a2d76c17ff55'];

      let randomNumber = Math.round(Math.random());

      let calendarBaseUrl = 'https://calendarific.com/api/v2/holidays';
      let calendarApiKey = '?api_key=' + arrKey[randomNumber];
      calendarApiKey = '?api_key=90961b72c233342ce4fa222f44d36fc55ec4c1a0';

      let calendarFullURL = calendarBaseUrl + calendarApiKey;
      // let fullUrl = calendarFullURL + countryLink + yearLink + locationLink + monthLink + localNational;

      method = this.roleDbService.httpService.get(calendarFullURL + countryLink + yearLink + locationLink + monthLink + localNational).pipe(
        mergeMap(res => {
          // localStorage.setItem('calendarTemp', 'res.data.response.holidays');
          // let dataStorage = localStorage.getItem('calendarTemp');

          ls.set<any>('calendarTemp', res.data.response.holidays);

          // let holidayObj = {};
          // let holidayArr = [];
          // res.data.response.holidays.forEach(element => {
          //   let holidayData = {};
          //   holidayData['start'] = element.date.iso;
          //   holidayData['end'] = element.date.iso;
          //   holidayData['title'] = element.name;
          //   holidayData['holidayName'] = element.name;
          //   holidayArr.push(holidayData);
          // });

          // let filterObj = {};
          // filterObj['year'] = new Date().getFullYear();
          // filterObj['country'] = 'MY';
          // filterObj['region'] = '';

          // holidayObj['code'] = 'Default';
          // holidayObj['filter'] = filterObj;
          // holidayObj['holiday'] = holidayArr;
          // holidayObj['rest'] = [
          //   {
          //     "fullname": "SATURDAY",
          //     "name": "SAT"
          //   },
          //   {
          //     "fullname": "SUNDAY",
          //     "name": "SUN"
          //   }
          // ]


          let resource = new Resource(new Array);
          // let data = new CreateHolidayDetailsModel();
          // data.CALENDAR_DETAILS_GUID = v1();
          // data.CALENDAR_GUID = calendarId;
          // data.YEAR = new Date().getFullYear();
          // data.PROPERTIES_XML = convertJsonToXML(holidayObj);

          // resource.resource.push(data);

          this.assignLeaveToCalendar([res.data.response.holidays, calendarId, resource]);

          return this.calendarProfileDbService.createByModel(resource, ['CALENDAR_DETAILS_GUID', 'CALENDAR_GUID', 'YEAR'], [], []);
        }), map(res => {
          return res.data.resource;
        })

      );

    }

    return method;
    // return of(tenantId)
  }

  public assignLeaveToCalendar([holidayArrList, calendarId, resource]: [any[], string, any]) {

    let holidayObj = {};
    let holidayArr = [];
    holidayArrList.forEach(element => {

      let holidayData = {};
      holidayData['start'] = element.date.iso;
      holidayData['end'] = element.date.iso;
      holidayData['title'] = element.name;
      holidayData['holidayName'] = element.name;
      holidayArr.push(holidayData);
    });

    let filterObj = {};
    filterObj['year'] = new Date().getFullYear();
    filterObj['country'] = 'MY';
    filterObj['region'] = '';

    holidayObj['code'] = 'Default';
    holidayObj['filter'] = filterObj;
    holidayObj['holiday'] = holidayArr;
    holidayObj['rest'] = [
      {
        "fullname": "SATURDAY",
        "name": "SAT"
      },
      {
        "fullname": "SUNDAY",
        "name": "SUN"
      }
    ]


    // let resource = new Resource(new Array);
    let data = new CreateHolidayDetailsModel();
    data.CALENDAR_DETAILS_GUID = v1();
    data.CALENDAR_GUID = calendarId;
    data.YEAR = new Date().getFullYear();
    data.PROPERTIES_XML = convertJsonToXML(holidayObj);

    resource.resource.push(data);
    return resource;
  }

  public assignDefaultToUser([tenantId, userId]: [string, string]) {
    // check tenant n user
    // check default
    // assign to user

    let roleId = '';
    let workingHoursId = '';
    let calendarId = '';
    let leavetypeData = [];
    let leavetypeEntitlementData = [];

    return this.roleDbService.findByFilterV2([], [`(TENANT_GUID=${tenantId})`]).pipe(
      mergeMap(res => {
        roleId = res[0].ROLE_GUID;
        console.log(res);
        return this.workingHourDbService.findByFilterV2([], [`(TENANT_GUID=${tenantId})`]);
      }), mergeMap(res => {
        workingHoursId = res[0].WORKING_HOURS_GUID;
        return this.holidayDbService.findByFilterV2([], [`(TENANT_GUID=${tenantId})`]);
      }), mergeMap(res => {
        calendarId = res[0].CALENDAR_GUID;
        return this.leavetypeService.findByFilterV2([], [`(TENANT_GUID=${tenantId})`]);
        // return forkJoin(of(roleId), of(workingHoursId), of(calendarId));
      }), mergeMap(res => {
        leavetypeData = res;
        return this.leavetypeEntitlementDbService.findByFilterV2([], [`(TENANT_GUID=${tenantId})`]);
      }), mergeMap(res => {
        leavetypeEntitlementData = res;
        return forkJoin(of(roleId), of(workingHoursId), of(calendarId), of(leavetypeData), of(leavetypeEntitlementData));
      }), mergeMap(res => {
        let resource = new Resource(new Array());
        let data = new UserInfoModel();
        // data.USER_GUID = userId;
        data.ROLE_GUID = roleId;
        data.CALENDAR_GUID = calendarId;
        data.WORKING_HOURS_GUID = workingHoursId;

        resource.resource.push(data);
        return this.userinfoService.updateByModel(resource, [], [`(USER_GUID=${userId})`], []);
      }), mergeMap(res => {
        let resource = new Resource(new Array());
        this.setupLeavetype([userId, leavetypeEntitlementData, resource]);

        return this.userLeaveEntitlementDbService.createByModel(resource, [], [], []);

      }), map(res => {
        return res.data.resource;
      })
    )

  }

  private setupLeavetype([userId, leavePolicy, resource]: [string, any[], Resource]) {
    leavePolicy.forEach(element => {
      let data = new UserLeaveEntitlementModel();
      data.USER_LEAVE_ENTITLEMENT_GUID = v1();
      data.USER_GUID = userId;
      data.LEAVE_TYPE_GUID = element.LEAVE_TYPE_GUID;
      data.ENTITLEMENT_GUID = element.ENTITLEMENT_GUID;
      data.PROPERTIES_XML = element.PROPERTIES_XML;
      data.TENANT_GUID = element.TENANT_GUID;

      let dateOfJoin = new Date(moment().format('YYYY-MM-DD'));
      console.log(dateOfJoin);
      // const dateOfJoin = new Date(userData.JOIN_DATE);
      const serviceYear = this.serviceYearCalcService.calculateEmployeeServiceYear(dateOfJoin);
      console.log(serviceYear);
      const policy = convertXMLToJson(element.PROPERTIES_XML);
      console.log(policy);
      const entitlementDay = this.proratedMonthEndYearService.calculateEntitledLeave(dateOfJoin, serviceYear, policy);

      data.DAYS_ADDED = entitlementDay;
      data.ACTIVE_FLAG = 1;
      data.YEAR = new Date().getFullYear();
      resource.resource.push(data);
    });

    return resource;
  }

}