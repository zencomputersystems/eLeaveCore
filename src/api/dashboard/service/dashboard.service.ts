import { Injectable } from '@nestjs/common';
import { Observable, of, forkJoin } from 'rxjs';
import { mergeMap, map } from 'rxjs/operators';
import { CalendarProfileDbService } from '../../../admin/holiday/db/calendar-profile-db.service';
import moment = require('moment');
import { UserInfoDbService } from '../../../admin/holiday/db/user-info.db.service';
import { BirthdayDataDTO } from '../dto/birthday-data.dto';
import { LeaveTransactionDbService } from '../../leave/db/leave-transaction.db.service';
import { LongLeaveDTO } from '../dto/long-leave.dto';
import { UserprofileDbService } from '../../../api/userprofile/db/userprofile.db.service';
import { LongLeaveResultDTO } from '../dto/long-leave-result.dto';
/** XMLparser from zen library  */
var { convertXMLToJson } = require('@zencloudservices/xmlparser');

/**
 * Service for dashboard
 *
 * @export
 * @class DashboardService
 */
@Injectable()
export class DashboardService {

  /**
   *Creates an instance of DashboardService.
   * @param {CalendarProfileDbService} calendarProfileDbService calendar profile db service
   * @param {UserInfoDbService} userInfoDbService user info db service
   * @param {LeaveTransactionDbService} leaveTransactionDbService leave transaction db service
   * @param {UserprofileDbService} userprofileDbService user profile db service
   * @memberof DashboardService
   */
  constructor(
    private readonly calendarProfileDbService: CalendarProfileDbService,
    private readonly userInfoDbService: UserInfoDbService,
    private readonly leaveTransactionDbService: LeaveTransactionDbService,
    public readonly userprofileDbService: UserprofileDbService
  ) { }
  /**
   * Get upcoming holiday and upcoming leave taken
   *
   * @param {string} user_guid
   * @returns {Observable<any>}
   * @memberof DashboardService
   */
  public upcomingHolidays(user_guid: string): Observable<any> {

    return this.userInfoDbService.getCalendarProfile(user_guid).pipe(
      mergeMap(res => {
        let calendarProfileGuid = res[0].CALENDAR_GUID;
        let calendarHoliday = this.calendarProfileDbService.findAll(calendarProfileGuid, moment().year());
        return calendarHoliday;
      })
    )
  }

  /**
   * Get birthday
   *
   * @param {string} user_guid
   * @param {string} tenant_guid
   * @returns {Observable<BirthdayDataDTO>}
   * @memberof DashboardService
   */
  public getBirthday(user_guid: string, tenant_guid: string): Observable<BirthdayDataDTO> {
    return this.userInfoDbService.getDateOfBirth(user_guid, tenant_guid).pipe(
      mergeMap(res => {
        // Get DOB from db
        let dateOfBirth = res.data.resource[0].DOB;
        // Convert by moment js
        let check = moment(dateOfBirth, 'YYYY-MM-DD');
        // Separate date
        let day = check.format('DD');
        let month = check.format('MM');
        let year = check.format('YYYY');
        // Get this year
        let currentYear = moment().year();
        // Create date birday upcoming celebration
        let thisYearDOB = moment(currentYear + '-' + month + '-' + day, 'YYYY-MM-DD');
        // Determine past birthday or not
        if (thisYearDOB < moment()) {
          thisYearDOB = moment((currentYear + 1) + '-' + month + '-' + day, 'YYYY-MM-DD');
        }
        // Calculate days remaining
        let daysToCelebrate = thisYearDOB.diff(moment(), 'days') + 1;

        // Setup data to send
        let birthdayData = new BirthdayDataDTO;

        birthdayData.date = check.format('YYYY-MM-DD');
        birthdayData.upcoming = thisYearDOB.format('YYYY-MM-DD');
        birthdayData.day = day;
        birthdayData.month = check.format('MMM');
        birthdayData.age = currentYear - parseInt(year);
        birthdayData.remainingDays = daysToCelebrate + (daysToCelebrate > 1 ? ' days to go' : ' day to go');

        return of(birthdayData);
      })
    )
  }

  /**
   * Get long leave
   *
   * @param {[string, string, string]} [user_guid, tenant_guid, role]
   * @returns {Observable<any>}
   * @memberof DashboardService
   */
  public getLongLeave([user_guid, tenant_guid, role]: [string, string, string]): Observable<any> {
    let dateToday = moment().format('YYYY-MM-DD');
    let filters = ['LEAVE_TYPE_GUID', 'USER_GUID', 'START_DATE', 'END_DATE', 'NO_OF_DAYS'];
    if (role == 'admin') {
      filters = ['(TENANT_GUID=' + tenant_guid + ')', '(STATUS=APPROVED)', '(START_DATE > ' + dateToday + ')', '(NO_OF_DAYS > 4)'];
    } else if (role == 'superior') {
      filters = ['(USER_GUID IN ( SELECT USER_GUID FROM l_view_user_profile_list WHERE MANAGER_USER_GUID = "' + user_guid + '" ))', '(TENANT_GUID=' + tenant_guid + ')', '(STATUS=APPROVED)', '(START_DATE > ' + dateToday + ')', '(NO_OF_DAYS > 4)'];
    } else {
      filters = ['(USER_GUID=' + user_guid + ')', '(TENANT_GUID=' + tenant_guid + ')', '(STATUS=APPROVED)', '(START_DATE > ' + dateToday + ')', '(NO_OF_DAYS > 4)'];
    }

    return this.leaveTransactionDbService.findLongLeave(filters).pipe(mergeMap(res => {
      let allData = res.data.resource;
      let userData;

      if (allData.length > 0) {
        let userGuid = '';

        allData.forEach(element => {
          userGuid = userGuid == '' ? '"' + element.USER_GUID + '"' : userGuid + ',"' + element.USER_GUID + '"';
        });

        userData = this.userprofileDbService.findByFilterV4([['USER_GUID', 'FULLNAME', 'DESIGNATION'], ['(USER_GUID IN (' + userGuid + '))'], null, null]);
      } else {
        userData = of([]);
      }

      return forkJoin(of(res), userData);
    }));
  }

  /**
   * Get long leave for superior
   *
   * @param {[string, string, string]} [user_guid, tenant_guid, role]
   * @returns {Observable<any>}
   * @memberof DashboardService
   */
  public getLongLeaveSuperior([user_guid, tenant_guid, role]: [string, string, string]): Observable<any> {
    const field = ['USER_GUID', 'FULLNAME', 'DESIGNATION'];
    const filter = ['(TENANT_GUID = ' + tenant_guid + ')', '(MANAGER_USER_GUID=' + user_guid + ')'];
    return this.userprofileDbService.findByFilterV3(field, filter)
      .pipe(map(res => {
        let downline = res.data.resource;
        let userList: string = '';

        if (downline.length > 0) {
          downline.forEach(element => {
            userList = userList == '' ? '"' + user_guid + '","' + element.USER_GUID + '"' : userList + ',"' + element.USER_GUID + '"';
          });
        } else {
          userList = user_guid;
        }

        return { downline, userList };
      }), mergeMap(res => {
        let { downline, userList } = res;
        let dateToday = moment().format('YYYY-MM-DD');
        const filterLeave = ['(USER_GUID IN ( ' + userList + ' ))', '(TENANT_GUID=' + tenant_guid + ')', '(STATUS=APPROVED)', '(START_DATE > ' + dateToday + ')', '(NO_OF_DAYS > 4)'];
        let resultsLeave = this.leaveTransactionDbService.findLongLeave(filterLeave);
        return forkJoin(resultsLeave, of(downline));
      }));
  }

  /**
   * Process long leave
   *
   * @param {*} data
   * @returns
   * @memberof DashboardService
   */
  public processLongLeave(data, dataUser) {

    let dataArr = new LongLeaveResultDTO;
    let personalArr = [];
    let downlineArr = [];
    data.forEach(element => {
      let userData = dataUser.find(x => x.USER_GUID.toString() === element.USER_GUID.toString());
      let daystogo = moment(element.START_DATE, 'YYYY-MM-DD').diff(moment(), 'days');
      let longLeaveData = new LongLeaveDTO;

      longLeaveData.leaveTypeGuid = element.LEAVE_TYPE_GUID;
      longLeaveData.userGuid = element.USER_GUID;
      longLeaveData.startDate = moment(element.START_DATE, 'YYYY-MM-DD').format('ddd DD MMMM YYYY');
      longLeaveData.endDate = moment(element.END_DATE, 'YYYY-MM-DD').format('ddd DD MMMM YYYY');
      longLeaveData.noOfDays = element.NO_OF_DAYS;
      longLeaveData.daysToGo = daystogo + ' days to go';

      if (userData != null) {
        longLeaveData.fullname = userData.FULLNAME;
        longLeaveData.designation = userData.DESIGNATION;
        downlineArr.push(longLeaveData);
      } else {
        personalArr.push(longLeaveData);
      }

    });
    dataArr.personal = personalArr;
    dataArr.downline = downlineArr;

    return dataArr;
  }

  /**
   * Add time to date for calendar usage
   *
   * @param {*} element
   * @returns
   * @memberof DashboardService
   */
  public addTime(element) {
    // get working hours details for each user
    let workingHours = convertXMLToJson(element.PROPERTIES_XML);

    // First tenary : for full day leave
    // Second tenary : for halfday leave (AM,PM)
    // Third tenary : for quarterday leave (Q1,Q2,Q3,Q4)
    let slotPath =
      element.TIME_SLOT == null ? workingHours.property.fullday :
        element.TIME_SLOT == 'AM' || element.TIME_SLOT == 'PM' ? workingHours.property.halfday[element.TIME_SLOT] :
          workingHours.property.quarterday[element.TIME_SLOT];

    element.START_DATE = element.START_DATE + ' ' + slotPath.start_time;
    element.END_DATE = element.END_DATE + ' ' + slotPath.end_time;

    // remove properties xml from array
    delete element.PROPERTIES_XML;

    return element;
  }

  /**
   * Get my task
   *
   * @param {string} userGuid
   * @returns
   * @memberof DashboardService
   */
  public getMyTask(userGuid: string) {
    // console.log(userGuid);
    return this.userInfoDbService.findMyDownline(userGuid).pipe(
      map(res => {
        // console.log(res.length);
        if (res.length == 0)
          throw { "status": "Not available" };
        let mergeId: string;
        res.forEach(element => {
          mergeId = mergeId == undefined ? '"' + element.USER_GUID + '"' : mergeId + ',"' + element.USER_GUID + '"';
        });
        let pendingLeave = this.leaveTransactionDbService.findAllPendingLeave(mergeId);
        return { pendingLeave, mergeId };
      }), mergeMap(res => {

        let fullname = this.userInfoDbService.findFullname(res.mergeId);
        let dataTemp = forkJoin(res.pendingLeave, fullname)
        return dataTemp;
      })
    );
  }

  /**
   * Convert xml data to json
   *
   * @param {[any,any]} [upcomingHolidayArr,data]
   * @returns
   * @memberof DashboardService
   */
  public convertData([upcomingHolidayArr, data]: [any, any]) {
    let holidayData = convertXMLToJson(data.data.resource[0].PROPERTIES_XML);

    holidayData.holiday.forEach(element => {
      if (moment(element.start, 'YYYY-MM-DD') > moment()) {
        upcomingHolidayArr.push(element);
      }
    });

    return upcomingHolidayArr;
  }
}