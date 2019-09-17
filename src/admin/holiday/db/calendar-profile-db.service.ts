import { Injectable, HttpService } from '@nestjs/common';
import { BaseDBService } from 'src/common/base/base-db.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { Observable } from 'rxjs';

/**
 * DB service for calendar profile
 *
 * @export
 * @class CalendarProfileDbService
 * @extends {BaseDBService}
 */
@Injectable()
export class CalendarProfileDbService extends BaseDBService {

  /**
   * Declare tablename
   *
   * @private
   * @memberof CalendarProfileDbService
   */
  private _tableName = "l_calendar_profile_details";

  /**
   *Creates an instance of CalendarProfileDbService.
   * @param {HttpService} httpService http service
   * @param {QueryParserService} queryService query service
   * @memberof CalendarProfileDbService
   */
  constructor(
    public readonly httpService: HttpService,
    public readonly queryService: QueryParserService) {
    super(httpService, queryService, "l_calendar_profile_details");
  }

  /**
   * Find all holiday by calendar guid
   *
   * @param {string} calendarProfileId
   * @param {number} year
   * @returns {Observable<any>}
   * @memberof CalendarProfileDbService
   */
  public findAll(calendarProfileId: string, year: number): Observable<any> {

    const fields = ['PROPERTIES_XML'];
    const filters = ['(CALENDAR_GUID=' + calendarProfileId + ')', '(YEAR=' + year + ')'];

    const url = this.queryService.generateDbQueryV2(this._tableName, fields, filters, []);

    //call DF to validate the user
    return this.httpService.get(url);

  }

}