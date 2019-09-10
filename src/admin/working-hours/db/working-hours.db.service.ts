import { HttpService, Injectable } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { BaseDBService } from 'src/common/base/base-db.service';
import { Observable } from 'rxjs';

@Injectable()
export class WorkingHoursDbService extends BaseDBService {

  private _tableName = "l_working_hours_profile";

  constructor(
    public readonly httpService: HttpService,
    public readonly queryService: QueryParserService) {
    super(httpService, queryService, "l_working_hours_profile");
  }
  public findAllWorkingHoursProfile(): Observable<any> {

    const fields = ['WORKING_HOURS_GUID', 'CODE', 'DESCRIPTION'];
    const filters = ['(DELETED_AT IS NULL)'];

    const url = this.queryService.generateDbQueryV2(this._tableName, fields, filters, []);

    return this.httpService.get(url);

  }

  public findAll(workingHoursProfileId: string): Observable<any> {

    const fields = ['PROPERTIES_XML'];
    const filters = ['(WORKING_HOURS_GUID=' + workingHoursProfileId + ')'];

    const url = this.queryService.generateDbQueryV2(this._tableName, fields, filters, []);

    return this.httpService.get(url);

  }

}