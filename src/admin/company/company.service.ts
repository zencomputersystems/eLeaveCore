import { Injectable, HttpService } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { Observable } from 'rxjs';
import { Resource } from 'src/common/model/resource.model';
import { v1 } from 'uuid';
import { CompanyModel } from './model/company.model';
import { BaseDBService } from 'src/common/base/base-db.service';
import { IDbService } from 'src/interface/IDbService';

@Injectable()
export class CompanyService extends BaseDBService implements IDbService{

    private _tableName = "tenant_company";

    constructor(
        public readonly httpService: HttpService,
        public readonly queryService: QueryParserService){
            super(httpService,queryService,"tenant_company");
        }


     //find all tenant company
     public findAll(TENANT_GUID: string): Observable<any> {

        const fields = ['TENANT_COMPANY_GUID','NAME'];
        const filters = ['(TENANT_COMPANY_GUID='+TENANT_GUID+')'];

        //url
        const url = this.queryService.generateDbQueryV2(this._tableName,fields,filters,[]);
 
        //call DF to validate the user
        return this.httpService.get(url);
        
    }

    //find tenant company by id
    public findById(TENANT_GUID: any, id: string): Observable<any> {

        const fields = ['BRANCH_GUID','NAME'];
        const filters = ['(BRANCH_GUID='+id+')','(TENANT_GUID='+TENANT_GUID+')'];

        //url
        const url = this.queryService.generateDbQueryV2(this._tableName,fields,filters,[]);
        
        //call DF to validate the user
        return this.httpService.get(url);
    }


    //create new branch
    create(user: any, name: string) {

        const resource = new Resource(new Array);
        const data = new CompanyModel();

        data.TENANT_COMPANY_GUID = v1();
        data.CREATION_TS = new Date().toISOString();
        data.CREATION_USER_GUID = user.USER_GUID;
        data.ACTIVATION_FLAG = 1;
        data.NAME = name;
        data.TENANT_GUID = user.TENANT_GUID;

        resource.resource.push(data);

        return this.createByModel(resource,[],[],[]);

    }


    //update existing branch
    update(user:any, d: any) {

        const resource = new Resource(new Array);
        const data = new CompanyModel();

        data.TENANT_COMPANY_GUID = d.id;
        data.UPDATE_TS = new Date().toISOString();
        data.UPDATE_USER_GUID = user.USER_GUID;
        data.NAME = d.name;

        resource.resource.push(data);

        return this.updateByModel(resource,[],[],[]);
    }

}
