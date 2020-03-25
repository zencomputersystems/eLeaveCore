import { BaseDBService } from '../../common/base/base-db.service';
import { IDbService } from '../../interface/IDbService';
import { HttpService, Injectable } from '@nestjs/common';
import { QueryParserService } from '../../common/helper/query-parser.service';
@Injectable()
export class ProfileDefaultDbService extends BaseDBService implements IDbService {
  constructor(
    public httpService: HttpService,
    public queryService: QueryParserService
  ) {
    super(httpService, queryService, 'l_profile_default');
  }
}