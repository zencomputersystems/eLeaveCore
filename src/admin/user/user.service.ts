import { Injectable, HttpService } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { UserModel } from './model/user.model';
import { Resource } from 'src/common/model/resource.model';
import { v1 } from 'uuid';
import { Observable } from 'rxjs';
import { BaseDBService } from 'src/common/base/base-db.service';

/**
 *
 *
 * @export
 * @class UserService
 * @extends {BaseDBService}
 */
@Injectable()
export class UserService extends BaseDBService {

    private table_name = 'user_main';
    constructor(
        public readonly httpService: HttpService,
        public readonly queryService: QueryParserService){
            super(httpService,queryService,"user_main")
        }

    //find single user
    public async findOne(email: string,password: string): Promise<any> {

        const fields = ['USER_GUID','EMAIL','TENANT_GUID'];
        //const filters = ['(EMAIL='+email+')','(PASSWORD='+CryptoJS.SHA256(password.trim()).toString(CryptoJS.enc.Hex)+')'];
        const filters = ['(EMAIL='+email+')','(PASSWORD='+password+')'];

        console.log(filters);

        const url = this.queryService.generateDbQuery(this.table_name,fields,filters);
  
        //call DF to validate the user
        return this.httpService.get(url).toPromise();
        
    }

    // // pass list of filter and get the data
    // public findByFilter(filters: Array<string>): Observable<any> {

    //     const fields = ['USER_GUID','EMAIL','TENANT_GUID','ACTIVATION_FLAG'];
       
    //     const url = this.queryService.generateDbQuery(this.table_name,fields,filters);
  
    //     //call DF to validate the user
    //     return this.httpService.get(url);
    // }

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

        return this.createByModel(resource,[],[],[]);

    }

}
