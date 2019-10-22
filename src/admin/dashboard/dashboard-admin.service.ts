import { Injectable } from '@nestjs/common';
import { of } from 'rxjs';
import { UserInfoDbService } from '../holiday/db/user-info.db.service';
import * as moment from 'moment';

@Injectable()
export class DashboardAdminService {

  constructor(
    private readonly userInfoDbService: UserInfoDbService
  ) { }

  public getUpcomingJoiner(tenantGuid: string) {
    let filter = ['(JOIN_DATE > "' + moment().format('YYYY-MM-DD') + '") AND (TENANT_GUID=' + tenantGuid + ')'];
    let fields = ['FULLNAME', 'DESIGNATION', 'JOIN_DATE'];
    return this.userInfoDbService.findByFilterV3(fields, filter);

    // return of('ok');
  }

  public getUpcomingLeaver(tenantGuid: string) {
    let filter = ['(RESIGNATION_DATE > "' + moment().format('YYYY-MM-DD') + '") AND (TENANT_GUID=' + tenantGuid + ')'];
    let fields = ['FULLNAME', 'DESIGNATION', 'RESIGNATION_DATE'];
    return this.userInfoDbService.findByFilterV3(fields, filter);

    // return of('ok');
  }

}