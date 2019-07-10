import { Injectable, HttpService } from '@nestjs/common';
import { BaseDBService } from 'src/common/base/base-db.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';

/**
 * DB Service for user info to update calendar
 *
 * @export
 * @class UserInfoDbService
 * @extends {BaseDBService}
 */
@Injectable()
export class UserInfoDbService extends BaseDBService {
    /**
     * Declare tablename user info
     *
     * @private
     * @memberof UserInfoDbService
     */
    private _tableName = "user_info";

    /**
     *Creates an instance of UserInfoDbService.
     * @param {HttpService} httpService Service for http
     * @param {QueryParserService} queryService Service for query
     * @memberof UserInfoDbService
     */
    constructor(
        public readonly httpService: HttpService,
        public readonly queryService: QueryParserService) {
        super(httpService, queryService, "user_info");
    }

}