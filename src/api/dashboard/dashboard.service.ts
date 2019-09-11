import { Injectable } from '@nestjs/common';
import { Observable, of, pipe } from 'rxjs';
import { DashboardDbService } from './db/dashboard.db.service';
import { map, mergeMap } from 'rxjs/operators';
import { HolidayDbService } from 'src/admin/holiday/db/holiday.db.service';
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
   * @param {DashboardDbService} dashboardDbService
   * @param {HolidayDbService} holidayDbService
   * @param {XMLParserService} xmlParserService
   * @memberof DashboardService
   */
  constructor(
    private readonly dashboardDbService: DashboardDbService,
    private readonly holidayDbService: HolidayDbService,
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
    let result = this.dashboardDbService.getCalendarProfile(user_guid).pipe(map(res => {
      // console.log(res);
      return res;
    }), map(res => {
      let calendarProfileGuid = res[0].CALENDAR_PROFILE_GUID;
      // console.log(calendarProfileGuid);
      let calendarHoliday = this.holidayDbService.findAll(calendarProfileGuid)
      // .subscribe(
      //   data => {
      //     console.log(data.data.resource);
      //     return data.data.resource;
      //   }, err => {
      //     console.log(err);
      //     return err;
      //   }
      // )
      return calendarHoliday;
    }), mergeMap(res => {
      res.subscribe(
        data => {
          console.log(this.xmlParserService.convertXMLToJson(data.data.resource[0].PROPERTIES_XML));

        }, err => {
          console.log(err);
        });
      return res;
    }))
    // .subscribe(
    //   data => {
    //     console.log(data.data.resource);
    //     // data.subscribe(
    //     //   data => {
    //     //     console.log(data);
    //     //   }, err => {
    //     //     console.log(err);
    //     //   })
    //     return data;
    //   }, err => {
    //     console.log(err);
    //     return err;
    //   }
    // );

    return result;
    // return of(user_guid);
  }
}