import { HttpService, Injectable } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { BaseDBService } from 'src/common/base/base-db.service';
import { Observable } from 'rxjs';

/**
 * Working hours db service
 *
 * @export
 * @class WorkingHoursDbService
 * @extends {BaseDBService}
 */
@Injectable()
export class WorkingHoursDbService extends BaseDBService {

  /**
   * Declare tablename
   *
   * @private
   * @memberof WorkingHoursDbService
   */
  private _tableName = "l_working_hours_profile";

  /**
   *Creates an instance of WorkingHoursDbService.
   * @param {HttpService} httpService http setvice
   * @param {QueryParserService} queryService query service
   * @memberof WorkingHoursDbService
   */
  constructor(
    public readonly httpService: HttpService,
    public readonly queryService: QueryParserService) {
    super(httpService, queryService, "l_working_hours_profile");
  }

  /**
   * Get working hours details
   *
   * @param {string} workingHoursProfileId
   * @returns {Observable<any>}
   * @memberof WorkingHoursDbService
   */
  public findAll(workingHoursProfileId: string): Observable<any> {

    const fields = ['PROPERTIES_XML'];
    const filters = ['(WORKING_HOURS_GUID=' + workingHoursProfileId + ')'];

    const url = this.queryService.generateDbQueryV2(this._tableName, fields, filters, []);

    return this.httpService.get(url);

  }

}