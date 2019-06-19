import { BaseDBService } from 'src/common/base/base-db.service';
import { IDbService } from 'src/interface/IDbService';
import { HttpService, Injectable } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { Observable } from 'rxjs';

/**
 *
 *
 * @export
 * @class UserprofileDbService
 * @extends {BaseDBService}
 */
@Injectable()
export class UserprofileDbService extends BaseDBService {

    private _tableName = "l_view_user_profile_list";

    constructor(
        public readonly httpService: HttpService,
        public readonly queryService: QueryParserService) {

        super(httpService, queryService, "l_view_user_profile_list");
    }

}