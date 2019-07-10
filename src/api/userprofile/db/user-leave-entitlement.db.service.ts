import { Injectable, HttpService } from '@nestjs/common';
import { BaseDBService } from 'src/common/base/base-db.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { IDbService } from 'src/interface/IDbService';

/**
 * DB Service for user leave entitlement
 *
 * @export
 * @class UserLeaveEntitlementDbService
 * @extends {BaseDBService}
 * @implements {IDbService}
 */
@Injectable()
export class UserLeaveEntitlementDbService extends BaseDBService implements IDbService {
    /**
     * Declare tablename leave entitlement
     *
     * @private
     * @memberof UserLeaveEntitlementDbService
     */
    private _table = 'l_main_user_leave_entitlement';

    /**
     *Creates an instance of UserLeaveEntitlementDbService.
     * @param {HttpService} httpService Service for http
     * @param {QueryParserService} queryService Service for query
     * @memberof UserLeaveEntitlementDbService
     */
    constructor(
        public readonly httpService: HttpService,
        public readonly queryService: QueryParserService) {

        super(httpService, queryService, "l_main_user_leave_entitlement");
    }
}