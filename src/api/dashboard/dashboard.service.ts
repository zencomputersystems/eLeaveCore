import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { CalendarProfileDbService } from '../../admin/holiday/db/calendar-profile-db.service';
import moment = require('moment');
import { UserInfoDbService } from 'src/admin/holiday/db/user-info.db.service';
import { BirthdayDataDTO } from './dto/birthday-data.dto';
import { LeaveTransactionDbService } from '../leave/db/leave-transaction.db.service';
import { LongLeaveDTO } from './dto/long-leave.dto';
import { XMLParserService } from '../../common/helper/xml-parser.service';

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
   * @param {UserCalendarDbService} userCalendarDbService
   * @param {HolidayDbService} holidayDbService
   * @param {XMLParserService} xmlParserService
   * @memberof DashboardService
   */
  constructor(
    private readonly calendarProfileDbService: CalendarProfileDbService,
    private readonly userInfoDbService: UserInfoDbService,
    private readonly leaveTransactionDbService: LeaveTransactionDbService,
    private readonly xmlParserService: XMLParserService
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
   * @returns {Observable<any>}
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
   * @param {*} user_guid
   * @param {*} tenant_guid
   * @returns {Observable<any>}
   * @memberof DashboardService
   */
  public getLongLeave(user_guid, tenant_guid): Observable<any> {
    return this.leaveTransactionDbService.findLongLeave(user_guid, tenant_guid);
  }

  /**
   * Process long leave
   *
   * @param {*} data
   * @returns
   * @memberof DashboardService
   */
  public processLongLeave(data) {

    let daystogo = moment(data[0].START_DATE, 'YYYY-MM-DD').diff(moment(), 'days');
    let longLeaveData = new LongLeaveDTO;
    longLeaveData.startDate = moment(data[0].START_DATE, 'YYYY-MM-DD').format('DD MMMM YYYY');
    longLeaveData.endDate = moment(data[0].END_DATE, 'YYYY-MM-DD').format('DD MMMM YYYY');
    longLeaveData.noOfDays = data[0].NO_OF_DAYS;
    longLeaveData.daysToGo = daystogo + ' days to go';
    return longLeaveData;
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
    let workingHours = this.xmlParserService.convertXMLToJson(element.PROPERTIES_XML);

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


}