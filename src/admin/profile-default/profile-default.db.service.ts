import { BaseDBService } from '../../common/base/base-db.service';
import { IDbService } from '../../interface/IDbService';
import { HttpService, Injectable } from '@nestjs/common';
import { QueryParserService } from '../../common/helper/query-parser.service';
/**
 * Profile default db service (declare table l_profile_default)
 *
 * @export
 * @class ProfileDefaultDbService
 * @extends {BaseDBService}
 * @implements {IDbService}
 */
@Injectable()
export class ProfileDefaultDbService extends BaseDBService implements IDbService {
  /**
   *Creates an instance of ProfileDefaultDbService.
   * @param {HttpService} httpService http service
   * @param {QueryParserService} queryService query service
   * @memberof ProfileDefaultDbService
   */
  constructor(
    public httpService: HttpService,
    public queryService: QueryParserService
  ) {
    super(httpService, queryService, 'l_profile_default');
  }
}