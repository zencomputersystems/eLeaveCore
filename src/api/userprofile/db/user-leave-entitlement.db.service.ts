import { Injectable, HttpService } from "@nestjs/common";
import { BaseDBService } from "src/common/base/base-db.service";
import { QueryParserService } from "src/common/helper/query-parser.service";

@Injectable()
export class UserLeaveEntitlementDbService extends BaseDBService {
    private _table = 'l_main_user_leave_entitlement';

    constructor(
        public readonly httpService: HttpService,
        public readonly queryService: QueryParserService){

        super(httpService,queryService,"l_main_user_leave_entitlement");
    }
}