import { BaseDBService } from "src/common/base/base-db.service";
import { HttpService, Injectable } from "@nestjs/common";
import { QueryParserService } from "src/common/helper/query-parser.service";

@Injectable()
export class RoleDbService extends BaseDBService {
    private _tableName = "l_role_profile";

    constructor(
        public readonly httpService: HttpService,
        public readonly queryService: QueryParserService) {
        super(httpService, queryService, "l_role_profile");
    }
}