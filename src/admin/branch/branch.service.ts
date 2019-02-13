import { Injectable, HttpService } from '@nestjs/common';
import { DreamFactory } from 'src/config/dreamfactory';
import { Observable } from 'rxjs';
import { BranchModel } from './model/branch.model';
import { Resource } from 'src/common/model/resource.model';
import {v1} from 'uuid';

@Injectable()
export class BranchService {
    constructor(private readonly httpService: HttpService){}

    //find all tenant branch
    public findAll(userid: string, tenantid:string): Observable<any> {

        //url
        const url = DreamFactory.df_host+"main_branch?fields=BRANCH_GUID%2CNAME";
 
        //call DF to validate the user
        return this.httpService.get(url);
        
    }

    //find tenant branch by id
    public findById(userid: string, tenantid:string, id: string): Observable<any> {
        //url
        const url = DreamFactory.df_host+"main_branch?fields=BRANCH_GUID%2CNAME&filter=BRANCH_GUID="+id;
        
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

        const url = DreamFactory.df_host+"main_branch";

        return this.httpService.post(url,resource);

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

        const url = DreamFactory.df_host+"main_branch";

        return this.httpService.patch(url,resource);

    }
}
