import { Injectable, HttpService } from '@nestjs/common';
import { BaseDBService } from '../../../common/base/base-db.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { Observable } from 'rxjs';

@Injectable()
export class DashboardDbService extends BaseDBService {

  constructor(
    public readonly httpService: HttpService,
    public readonly queryService: QueryParserService,
    public readonly commonFunctionService: CommonFunctionService) {
    super(httpService, queryService, "l_main_user_calendar");
  }

  public getCalendarProfile(userGuid: string) {
    let currentYear = new Date().getFullYear();
    let fields = ['CALENDAR_PROFILE_GUID'];
    let filters = ['(USER_GUID=' + userGuid + ')', '(YEAR=' + currentYear + ')'];
    return this.findByFilterV2(fields, filters);
  }

}