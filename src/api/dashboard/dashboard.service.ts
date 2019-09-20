import { Injectable } from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { UserCalendarDbService } from './db/user-calendar.db.service';
import { mergeMap } from 'rxjs/operators';
import { CalendarProfileDbService } from '../../admin/holiday/db/calendar-profile-db.service';
import moment = require('moment');
import { UserInfoDbService } from 'src/admin/holiday/db/user-info.db.service';
import { BirthdayDataDTO } from './dto/birthday-data.dto';

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
    private readonly userCalendarDbService: UserCalendarDbService,
    private readonly calendarProfileDbService: CalendarProfileDbService,
    private readonly userInfoDbService: UserInfoDbService
  ) { }
  /**
   * Get upcoming holiday and upcoming leave taken
   *
   * @param {string} user_guid
   * @returns {Observable<any>}
   * @memberof DashboardService
   */
  public upcomingHolidays(user_guid: string): Observable<any> {
    return this.userCalendarDbService.getCalendarProfile(user_guid).pipe(
      mergeMap(res => {
        let calendarProfileGuid = res[0].CALENDAR_PROFILE_GUID;
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
  public getBirthday(user_guid: string, tenant_guid: string): Observable<any> {
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

}