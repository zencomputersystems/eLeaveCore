import { Injectable, HttpService } from '@nestjs/common';
import { Observable, of, pipe, forkJoin } from 'rxjs';
import { map, mergeMap, filter } from 'rxjs/operators';
import { UserService } from '../user/user.service';
import { UserLeaveEntitlementDbService } from 'src/api/userprofile/db/user-leave-entitlement.db.service';
import { Resource } from 'src/common/model/resource.model';
import { UserModel } from '../user/model/user.model';
import { LeavetypeEntitlementDbService } from '../leavetype-entitlement/db/leavetype-entitlement.db.service';
import { LeaveTypeEntitlementModel } from '../leavetype-entitlement/model/leavetype_entitlement.model';
import { UserLeaveEntitlementModel } from 'src/api/userprofile/model/user-leave-entitlement.model';
import { v1 } from 'uuid';
import { ServiceYearCalc } from 'src/common/policy/entitlement-type/services/service-year-calculation-service/serviceYearCalc.service';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { LeaveEntitlementBaseService } from 'src/common/policy/entitlement-type/services/leave-entitlement-type/leave-entitlement-base.service';
import { UserLeaveEntitlementSummaryDbService } from 'src/api/userprofile/db/user-leave-summary.db.service';
import { UserprofileDbService } from 'src/api/userprofile/db/userprofile.db.service';
import { ViewUserProfileListModel } from 'src/api/userprofile/model/view_userprofile_list.model';
import { GeneralLeavePolicyService } from '../general-leave-policy/general-leave-policy.service';
import { GeneralLeavePolicyModel } from '../general-leave-policy/model/general-leave-policy.model';
import { HolidayService } from '../holiday/holiday.service';
import { HolidayDbService } from '../holiday/db/holiday.db.service';
import { CalendarProfileDbService } from '../holiday/db/calendar-profile-db.service';
import { HolidayDataDTO } from '../holiday/dto/holiday-data.dto';
import { CreateCalendarDTO } from '../holiday/dto/create-calendar.dto';

type userEntitlement = [Resource, LeaveTypeEntitlementModel, string, string, number, any, string, number, Date];
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
    private readonly leavetypeEntitlementDbService: LeavetypeEntitlementDbService,
    private readonly serviceYearCalcService: ServiceYearCalc,
    private readonly xmlParserService: XMLParserService,
    private readonly leaveEntitlementBaseService: LeaveEntitlementBaseService,
    private readonly userLeaveEntitlementSummaryDbService: UserLeaveEntitlementSummaryDbService,
    private readonly userprofileDbService: UserprofileDbService,
    private readonly generalLeavePolicyService: GeneralLeavePolicyService,
    private readonly holidayDbService: HolidayDbService,
    private readonly calendarProfileDbService: CalendarProfileDbService,
    private http: HttpService
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
          let dataRes = this.checkUser(res);

          // dataRes.resignUser = this.trimData(dataRes.resignUser);
          // dataRes.activeUser = this.trimData(dataRes.activeUser);
          // dataRes.disabledUser = this.trimData(dataRes.disabledUser);

          return dataRes;

        }), map(res => {
          // update status disable to resign user based on year
          let { resignUser, activeUser, disabledUser } = res;
          // let resultDisable = 
          this.disableProcess(user, resignUser)
            .subscribe(
              data => {
                return 'Successfully disabled';
              }, err => {
                return 'Failed to disable';
              });

          return { resignUser, disabledUser, activeUser };
        })
        , map(res => {
          // get all leavetype detail policy
          let { resignUser, disabledUser, activeUser } = res;
          let leavetypePolicy = this.leavetypeEntitlementDbService.findByFilterV2([], ['(DELETED_AT IS NULL)']);
          return { resignUser, disabledUser, activeUser, leavetypePolicy };

        })
        , map(res => {
          // update user entitlement for active user
          let { resignUser, disabledUser, activeUser, leavetypePolicy } = res;

          let resultEntitlement = this.checkEntitlement(activeUser);

          resultEntitlement.forEach(x => x.subscribe(
            data => {
              // this.processPolicy(leavetypePolicy, x, year, user); //find all leave entitlement
              return 'Success assign entitlement';
            }, err => {
              return 'Failed assign entitlement';
            }
          ));
          return { resignUser, disabledUser, activeUser, leavetypePolicy };

        })
        , map(res => {
          // get general leave policy for company
          let { resignUser, disabledUser, activeUser, leavetypePolicy } = res;
          let generalPolicy = this.generalLeavePolicyService.findAll(user.TENANT_GUID);
          return { resignUser, disabledUser, activeUser, leavetypePolicy, generalPolicy };

        })
        , map(res => {
          // assign carry forward entitlement
          let { resignUser, disabledUser, activeUser, leavetypePolicy, generalPolicy } = res;
          // this.checkCarryForward(activeUser, leavetypePolicy, generalPolicy, user, year);
          // let finalRes = [];
          // finalRes['Disable user'] = resultDisable;
          // return finalRes;
          // let tmp = [];

          // res.resignUser = this.trimData(res.resignUser);
          // res.activeUser = this.trimData(res.activeUser);
          // res.disabledUser = this.trimData(res.disabledUser);

          return { resignUser, activeUser, disabledUser };

        }), map(res => {
          this.generateNewCalendar(user, year - 1);
          return res;
        })
      )

    return result;
  }

  /**
   * Generate new calendar
   *
   * @param {*} user
   * @param {number} year
   * @returns
   * @memberof YearEndClosingService
   */
  public generateNewCalendar(user: any, year: number) {

    return this.holidayDbService.findAllProfile()
      .pipe(map(res => {
        let calendarProfileList = res.data.resource;
        let yearBase = year; // year closing
        year = year + 1; // next year setup


        // loop each calendar profile
        calendarProfileList.forEach(element => {
          // get eaxh calendar holiday one by one
          this.calendarProfileDbService.findAll(element.CALENDAR_GUID, yearBase).pipe(
            mergeMap(res => {
              // find filter criteria and get data from calendarific
              let filters = this.xmlParserService.convertXMLToJson(element.FILTER_CRITERIA);

              let calendarBaseUrl = 'https://calendarific.com/api/v2/holidays';
              let calendarApiKey = '?api_key=fc56e1848bee6b48e3af29bcb042a2d76c17ff55';
              let calendarFullURL = calendarBaseUrl + calendarApiKey;

              let countryLink = '&country=' + filters.country;
              let yearLink = '&year=' + year;
              let locationLink = '&location=' + filters.region;

              let calendarificData = this.http.get(calendarFullURL + countryLink + yearLink + locationLink);

              return forkJoin(of(res), calendarificData);
            })
          ).subscribe(data => {
            if (data[0].data.resource[0].PROPERTIES_XML != null) {
              let dataCurrent: CreateCalendarDTO = this.xmlParserService.convertXMLToJson(data[0].data.resource[0].PROPERTIES_XML);

              console.log('_______________________________________________________________________________________________');
              console.log(element.CALENDAR_GUID);
              let dataNewYear = new CreateCalendarDTO;
              let newYearHoliday = [];

              dataCurrent.holiday.forEach(element2 => {
                if (element2.holidayName != undefined) {
                  // console.log(element2.holidayName);
                  // console.log(element.CODE);
                  // console.log(element2.holidayName);
                  let dataSame = data[1].data.response.holidays.filter(x => x.name == element2.holidayName);

                  if (dataSame.length > 0) {
                    let dataArr = new HolidayDataDTO;
                    // console.log(dataSame);
                    dataArr.title = element2.title;
                    dataArr.holidayName = dataSame[0].name;
                    dataArr.start = dataSame[0].date.iso;
                    dataArr.end = dataSame[0].date.iso;
                    // console.log(dataArr);
                    newYearHoliday.push(dataArr);
                  }
                }
              });

              dataNewYear.code = dataCurrent.code;
              dataNewYear.filter = dataCurrent.filter;
              dataNewYear.rest = dataCurrent.rest;
              dataNewYear.holiday = newYearHoliday;

              console.log(dataNewYear);
              // dataCurrent.holiday.forEach(element => {
              //   if (element.holidayName != undefined) {
              //     console.log(element.holidayName);
              //   }
              //   // console.log(element.holidayName);
              // });
            }
          }, err => {
            console.log(err);
          });


        });
      })
      ).subscribe();

  }

  /**
   * Check carry forward if any
   *
   * @param {ViewUserProfileListModel[]} activeUser
   * @param {Observable<any[]>} leavetypePolicy
   * @param {Observable<any>} generalPolicy
   * @param {*} user
   * @param {number} year
   * @returns
   * @memberof YearEndClosingService
   */
  public checkCarryForward(activeUser: ViewUserProfileListModel[], leavetypePolicy: Observable<any[]>, generalPolicy: Observable<any>, user: any, year: number) {

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

            entitlement.forEach(element => {
              let getLeavePolicy: LeaveTypeEntitlementModel = leavetypePolicyData.find(x => x.LEAVE_TYPE_GUID === element.LEAVE_TYPE_GUID);
              let policyLeave = this.xmlParserService.convertXMLToJson(getLeavePolicy.PROPERTIES_XML);
              let dayCF = policyLeave.levels.leaveEntitlement.carryForward;


              if (dayCF != 0 && element.BALANCE_DAYS > 0) {
                // if balance more than CF, get CF, else get balance if greater than 0
                let dayAvailableCF = element.BALANCE_DAYS >= dayCF ? dayCF : element.BALANCE_DAYS;

                let findCF = this.getLeaveEntitlement(element.USER_GUID, ['(CF_FLAG=1)', '(LEAVE_TYPE_GUID=' + element.LEAVE_TYPE_GUID + ')', '(YEAR=' + year + ')']).pipe(map(res => {
                  if (res.length > 0) {
                    return 'Already assigned CF leave';
                  } else {
                    this.assignNewYearEntitlement([resource, getLeavePolicy, element.USER_GUID, null, year, user, 'CF', dayAvailableCF, dateForfeitCF]);
                    this.assignUserLeaveEntitlement(resource);
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


  // public trimData(dataArr: string[]) {
  //   const keyDelete = ["TENANT_GUID", "TENANT_COMPANY_GUID", "USER_INFO_GUID", "DESIGNATION", "DEPARTMENT", "DIVISION", "BRANCH", "ATTACHMENT_ID", "STATUS_ACTIVATION", "RESIGNATION_DATE", "ACTIVATION_FLAG", "JOIN_DATE"]
  //   dataArr.forEach(userResign => {
  //     keyDelete.forEach(keyTemp => {
  //       delete userResign[keyTemp];
  //     });
  //   });
  //   return dataArr;
  // }






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
              this.assignNewYearEntitlement([resource, tempPolicy, res2.userguid, res2.joindate, year, user, 'STD', 0, null]);
            }
          }
        });
        assignETSuccess.push(res2);
        this.assignUserLeaveEntitlement(resource);

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
      usertemp = this.getLeaveEntitlement(element.USER_GUID, ['(PARENT_FLAG=1)']).pipe(map(res => {
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















  /**
   * Check if user has resignation date - we disable them
   *
   * @param {ViewUserProfileListModel[]} res
   * @returns
   * @memberof YearEndClosingService
   */
  public checkUser(res: ViewUserProfileListModel[]) {
    let userInfo: ViewUserProfileListModel[] = res;

    let resignUser = [];
    let activeUser = [];
    let disabledUser = [];

    userInfo.forEach(element => {
      if (new Date(element.RESIGNATION_DATE).getFullYear() <= new Date().getFullYear() && element.RESIGNATION_DATE != null && element.ACTIVATION_FLAG == 1) {
        resignUser.push(element);
      } else if (element.ACTIVATION_FLAG == 1) {
        activeUser.push(element);
      } else {
        disabledUser.push(element);
      }
    });

    // console.log(resignUser.length + ' - ' + activeUser.length + ' - ' + disabledUser.length);

    return { resignUser, activeUser, disabledUser };
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
    // userToDisable = '"2b93fc11-23d5-db42-dd9f-bb9499071156","7756ab98-e69e-48e1-5fc3-b7e30a157cf3"';

    const resource = new Resource(new Array);
    const data = new UserModel();

    data.ACTIVATION_FLAG = 0;
    data.UPDATE_TS = new Date().toISOString();
    data.UPDATE_USER_GUID = user.USER_GUID;

    resource.resource.push(data);

    return this.userService.updateByModel(resource, [], ['(USER_GUID IN (' + userToDisable + '))'], ['EMAIL']);
  }

}