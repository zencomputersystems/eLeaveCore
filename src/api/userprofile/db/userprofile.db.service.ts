import { BaseDBService } from 'src/common/base/base-db.service';
import { IDbService } from 'src/interface/IDbService';
import { HttpService, Injectable } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { Observable } from 'rxjs';

/**
 * DB Service for user profile
 *
 * @export
 * @class UserprofileDbService
 * @extends {BaseDBService}
 */
@Injectable()
export class UserprofileDbService extends BaseDBService {

    /**
     * Declare table view profile list
     *
     * @private
     * @memberof UserprofileDbService
     */
    private _tableName = "l_view_user_profile_list";

    /**
     *Creates an instance of UserprofileDbService.
     * @param {HttpService} httpService Service for http
     * @param {QueryParserService} queryService Service for query
     * @memberof UserprofileDbService
     */
    constructor(
        public readonly httpService: HttpService,
        public readonly queryService: QueryParserService) {

        super(httpService, queryService, "l_view_user_profile_list");
    }

}