import { Injectable, HttpService } from '@nestjs/common';
import { BaseDBService } from 'src/common/base/base-db.service';
import { IDbService } from 'src/interface/IDbService';
import { QueryParserService } from 'src/common/helper/query-parser.service';

/**
 * Auth db service tenant (check tenant subscription)
 *
 * @export
 * @class AuthDbService
 * @extends {BaseDBService}
 * @implements {IDbService}
 */
@Injectable()
export class AuthDbService extends BaseDBService implements IDbService {
  /**
   *Creates an instance of AuthDbService.
   * @param {HttpService} httpService http service
   * @param {QueryParserService} queryService query service
   * @memberof AuthDbService
   */
  constructor(
    public readonly httpService: HttpService,
    public readonly queryService: QueryParserService) {
    super(httpService, queryService, "tenant_subscription");
  }
}