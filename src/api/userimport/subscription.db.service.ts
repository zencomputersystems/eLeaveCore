import { Injectable, HttpService } from '@nestjs/common';
import { BaseDBService } from '../../common/base/base-db.service';
import { IDbService } from '../../interface/IDbService';
import { QueryParserService } from '../../common/helper/query-parser.service';

@Injectable()
export class SubscriptionDbService extends BaseDBService implements IDbService {
  constructor(
    public readonly httpService: HttpService,
    public readonly queryService: QueryParserService) {
    super(httpService, queryService, "t_view_subscription");
  }
}