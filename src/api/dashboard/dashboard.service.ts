import { Injectable } from '@nestjs/common';
import { Observable, of, pipe } from 'rxjs';
import { DashboardDbService } from './db/dashboard.db.service';
import { map, mergeMap } from 'rxjs/operators';
import { HolidayDbService } from 'src/admin/holiday/db/holiday.db.service';
import { XMLParserService } from '../../common/helper/xml-parser.service';
import { CalendarProfileDbService } from '../../admin/holiday/db/calendar-profile-db.service';
import moment = require('moment');

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
   * @param {DashboardDbService} dashboardDbService
   * @param {HolidayDbService} holidayDbService
   * @param {XMLParserService} xmlParserService
   * @memberof DashboardService
   */
  constructor(
    private readonly dashboardDbService: DashboardDbService,
    // private readonly holidayDbService: HolidayDbService,
    private readonly calendarProfileDbService: CalendarProfileDbService,
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
    return this.dashboardDbService.getCalendarProfile(user_guid).pipe(
      mergeMap(res => {
        let calendarProfileGuid = res[0].CALENDAR_PROFILE_GUID;
        let calendarHoliday = this.calendarProfileDbService.findAll(calendarProfileGuid, moment().year());
        return calendarHoliday;
      })
    )
  }

}