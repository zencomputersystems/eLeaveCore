import { Injectable, HttpService } from '@nestjs/common';
import CryptoJS = require('crypto-js');
import { QueryParserService } from 'src/common/helper/query-parser.service';

@Injectable()
export class UserService {

    private table_name = 'user_main';
    constructor(private readonly httpService: HttpService, private readonly queryService: QueryParserService){}

    //find single user
    public async findOne(email: string,password: string): Promise<any> {

        const fields = ['USER_GUID','EMAIL','TENANT_GUID'];
        const filters = ['(EMAIL='+email+')','(PASSWORD='+CryptoJS.SHA256(password.trim()).toString(CryptoJS.enc.Hex)+')'];
       
        const url = this.queryService.generateDbQuery(this.table_name,fields,filters);
  
        //call DF to validate the user
        return this.httpService.get(url).toPromise();
        
    }

    public async findOneByPayload(payload): Promise<any> {
        const fields = ['USER_GUID','EMAIL','TENANT_GUID'];
        const filters = ['(EMAIL='+payload.email+')','(TENANT_GUID='+payload.tenantId+')']
       
        const url = this.queryService.generateDbQuery(this.table_name,fields,filters);
  
        //call DF to validate the user
        return this.httpService.get(url).toPromise();
    }
}
