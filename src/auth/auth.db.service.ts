import { Injectable, HttpService } from '@nestjs/common';
import { BaseDBService } from 'src/common/base/base-db.service';
import { IDbService } from 'src/interface/IDbService';
import { QueryParserService } from 'src/common/helper/query-parser.service';

@Injectable()
export class AuthDbService extends BaseDBService implements IDbService {
  constructor(
    public readonly httpService: HttpService,
    public readonly queryService: QueryParserService) {
    super(httpService, queryService, "tenant_subscription");
  }
}