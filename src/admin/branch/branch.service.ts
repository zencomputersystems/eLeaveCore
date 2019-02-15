import { Injectable, HttpService } from '@nestjs/common';
import { DreamFactory } from 'src/config/dreamfactory';
import { Observable } from 'rxjs';
import { BranchModel } from './model/branch.model';
import { Resource } from 'src/common/model/resource.model';
import {v1} from 'uuid';
import { QueryParserService } from 'src/common/helper/query-parser.service';

@Injectable()
export class BranchService {

    private table_name = "main_branch";

    constructor(private readonly httpService: HttpService, private readonly queryService: QueryParserService){}

    //find all tenant branch
    public findAll(userid: string, tenantid:string): Observable<any> {

        const fields = ['BRANCH_GUID','NAME'];

        //url
        const url = this.queryService.generateDbQuery(this.table_name,fields,[]);
 
        //call DF to validate the user
        return this.httpService.get(url);
        
    }

    //find tenant branch by id
    public findById(userid: string, tenantid:string, id: string): Observable<any> {

        const fields = ['BRANCH_GUID','NAME'];
        const filters = ['(BRANCH_GUID='+id+')'];

        //url
        const url = this.queryService.generateDbQuery(this.table_name,fields,filters);
        
        //call DF to validate the user
        return this.httpService.get(url);
    }

    //create new branch
    create(user: any, name: string) {

        const resource = new Resource(new Array);
        const data = new BranchModel();

        data.BRANCH_GUID = v1();
        data.CREATION_TS = new Date().toISOString();
        data.CREATION_USER_GUID = user.USER_GUID;
        data.ACTIVE_FLAG = 1;
        data.NAME = name;

        resource.resource.push(data);

        return this.httpService.post(this.queryService.generateDbQuery(this.table_name,[],[]),resource);

    }

    //update existing branch
    update(user:any, d: any) {

        // do a checking first to determine this data belong to user
        
        const resource = new Resource(new Array);
        const data = new BranchModel();

        data.BRANCH_GUID = d.id;
        data.UPDATE_TS = new Date().toISOString();
        data.UPDATE_USER_GUID = user.USER_GUID;
        data.NAME = d.name;

        resource.resource.push(data);

        return this.httpService.patch(this.queryService.generateDbQuery(this.table_name,[],[]),resource);

    }
}
