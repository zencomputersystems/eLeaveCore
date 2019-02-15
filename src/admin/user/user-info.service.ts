import { Injectable, HttpService } from '@nestjs/common';
import { DreamFactory } from 'src/config/dreamfactory';
import { Observable } from 'rxjs';
import { QueryParserService } from 'src/common/helper/query-parser.service';

@Injectable()
export class UserInfoService {
    private table_name = "main_user_info_xml";
    private db_host = DreamFactory.df_host+this.table_name;

    constructor(private readonly httpService: HttpService, private readonly queryService: QueryParserService){}

    //find single user
    public findOne(userId: string, tenantId: string): Observable<any> {
        const fields = ['FULLNAME','INFO_XML'];
        const filters = ['(USER_GUID='+userId+')','(TENANT_GUID='+tenantId+')'];

        const url = this.queryService.generateDbQuery(this.table_name,fields,filters);

        return this.httpService.get(url);

    }
}
