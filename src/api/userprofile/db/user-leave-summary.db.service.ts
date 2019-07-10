import { Injectable, HttpService } from '@nestjs/common';
import { BaseDBService } from 'src/common/base/base-db.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { IDbService } from 'src/interface/IDbService';

/**
 * DB Service for user leave entitlement summary
 *
 * @export
 * @class UserLeaveEntitlementSummaryDbService
 * @extends {BaseDBService}
 * @implements {IDbService}
 */
@Injectable()
export class UserLeaveEntitlementSummaryDbService extends BaseDBService implements IDbService {
    // private _table = 'l_main_user_leave_entitlement';
    /**
     * Declare tablename view leave summary
     *
     * @private
     * @memberof UserLeaveEntitlementSummaryDbService
     */
    private _table = 'l_view_leave_summary';

    /**
     *Creates an instance of UserLeaveEntitlementSummaryDbService.
     * @param {HttpService} httpService Service for http
     * @param {QueryParserService} queryService Service for query
     * @memberof UserLeaveEntitlementSummaryDbService
     */
    constructor(
        public readonly httpService: HttpService,
        public readonly queryService: QueryParserService) {

        // super(httpService,queryService,"l_main_user_leave_entitlement");
        super(httpService, queryService, 'l_view_leave_summary');
    }
}