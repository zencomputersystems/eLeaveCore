import { Injectable, HttpService } from '@nestjs/common';
import { BaseDBService } from 'src/common/base/base-db.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { Observable } from 'rxjs';

/**
 * DB Service for holiday
 *
 * @export
 * @class HolidayDbService
 * @extends {BaseDBService}
 */
@Injectable()
export class HolidayDbService extends BaseDBService {
    /**
     * Declare tablename calendar profile
     *
     * @private
     * @memberof HolidayDbService
     */
    private _tableName = "l_calendar_profile";

    /**
     *Creates an instance of HolidayDbService.
     * @param {HttpService} httpService Service for http
     * @param {QueryParserService} queryService Service for query
     * @memberof HolidayDbService
     */
    constructor(
        public readonly httpService: HttpService,
        public readonly queryService: QueryParserService) {
        super(httpService, queryService, "l_calendar_profile");
    }

    /**
     * Find all holiday by calendar profile id
     *
     * @param {string} calendarProfileId
     * @returns {Observable<any>}
     * @memberof HolidayDbService
     */
    public findAll(calendarProfileId: string): Observable<any> {

        const fields = ['PROPERTIES_XML'];
        const filters = ['(CALENDAR_GUID=' + calendarProfileId + ')'];

        const url = this.queryService.generateDbQueryV2(this._tableName, fields, filters, []);

        //call DF to validate the user
        return this.httpService.get(url);

    }

    /**
     * Find all calendar profile
     *
     * @returns {Observable<any>}
     * @memberof HolidayDbService
     */
    public findAllProfile(): Observable<any> {

        const fields = ['CALENDAR_GUID', 'CODE'];
        const filters = [];

        const url = this.queryService.generateDbQueryV2(this._tableName, fields, filters, []);

        //call DF to validate the user
        return this.httpService.get(url);

    }

}