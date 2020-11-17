import { HttpService, Injectable } from '@nestjs/common';
import { BaseDBService } from 'src/common/base/base-db.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { IDbService } from 'src/interface/IDbService';

@Injectable()
export class EntitlementClaimTraceDbService extends BaseDBService implements IDbService {

  /**
   *Creates an instance of EntitlementClaimLogDbService.
   * @param {HttpService} httpService
   * @param {QueryParserService} queryService
   * @memberof EntitlementClaimLogDbService
   */
  constructor(
    public readonly httpService: HttpService,
    public readonly queryService: QueryParserService) {

    super(httpService, queryService, "l_leave_entitlement_claim_log");
  }
}