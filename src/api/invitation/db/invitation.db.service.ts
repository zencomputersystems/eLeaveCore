import { Injectable, HttpService } from "@nestjs/common";
import { BaseDBService } from "src/common/base/base-db.service";
import { QueryParserService } from "src/common/helper/query-parser.service";

@Injectable()
export class InvitationDbService extends BaseDBService {
    private _tableName = 'l_user_invitation';

    constructor(
        public readonly httpService: HttpService,
        public readonly queryService: QueryParserService
    ) {
        super(httpService,queryService,"l_user_invitation");
    }
}