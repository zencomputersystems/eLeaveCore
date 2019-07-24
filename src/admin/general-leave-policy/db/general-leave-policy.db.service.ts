import { HttpService, Injectable } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { BaseDBService } from 'src/common/base/base-db.service';

@Injectable()
export class GeneralLeavePolicyDbService extends BaseDBService {
    /**
     * Declare tablename l_role_profile
     *
     * @private
     * @memberof RoleDbService
     */
    private _tableName = "l_main_general_policy";

    /**
     *Creates an instance of RoleDbService.
     * @param {HttpService} httpService Service for http
     * @param {QueryParserService} queryService Service for query
     * @memberof RoleDbService
     */
    constructor(
        public readonly httpService: HttpService,
        public readonly queryService: QueryParserService) {
        super(httpService, queryService, "l_main_general_policy");
    }
  }