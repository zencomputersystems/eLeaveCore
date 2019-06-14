import { Injectable, HttpService } from "@nestjs/common";
import { BaseDBService } from "src/common/base/base-db.service";
import { QueryParserService } from "src/common/helper/query-parser.service";
import { IDbService } from "src/interface/IDbService";

/**
 *
 *
 * @export
 * @class UserLeaveEntitlementSummaryDbService
 * @extends {BaseDBService}
 * @implements {IDbService}
 */
@Injectable()
export class UserLeaveEntitlementSummaryDbService extends BaseDBService implements IDbService {
    // private _table = 'l_main_user_leave_entitlement';
    private _table = 'l_view_leave_summary';

    constructor(
        public readonly httpService: HttpService,
        public readonly queryService: QueryParserService) {

        // super(httpService,queryService,"l_main_user_leave_entitlement");
        super(httpService, queryService, 'l_view_leave_summary');
    }
}