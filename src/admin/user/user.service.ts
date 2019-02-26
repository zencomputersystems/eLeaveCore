import { Injectable, HttpService } from '@nestjs/common';
import CryptoJS = require('crypto-js');
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { UserModel } from './model/user.model';
import { Resource } from 'src/common/model/resource.model';
import { v1 } from 'uuid';
import { Observable } from 'rxjs';
import { DreamFactory } from 'src/config/dreamfactory';

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

    // pass list of filter and get the data
    public findByFilter(filters: Array<string>): Observable<any> {
        const fields = ['USER_GUID','EMAIL','TENANT_GUID','ACTIVATION_FLAG'];
       
        const url = this.queryService.generateDbQuery(this.table_name,fields,filters);
  
        //call DF to validate the user
        return this.httpService.get(url);
    }

    public async findOneByPayload(payload): Promise<any> {
        const fields = ['USER_GUID','EMAIL','TENANT_GUID'];
        const filters = ['(EMAIL='+payload.email+')','(TENANT_GUID='+payload.tenantId+')']
       
        const url = this.queryService.generateDbQuery(this.table_name,fields,filters);
  
        //call DF to validate the user
        return this.httpService.get(url).toPromise();
    }

    //create new user
    public create(user: any, d: any) {

        const data = new UserModel();

        data.USER_GUID = v1();
        data.TENANT_GUID = user.TENANT_GUID;
        data.LOGIN_ID = d.email;

        const resource = new Resource(new Array);
        resource.resource.push(data);

        return this.createByModel(resource);

    }

    public createByModel(data: Resource) {
    
        const url = DreamFactory.df_host+this.table_name+"?id_field=USER_GUID%2CEMAIL%2CSTAFF_ID";

        return this.httpService.post(url,data);

    }
}
