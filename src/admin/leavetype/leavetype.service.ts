import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DreamFactory } from 'src/config/dreamfactory';
import { Resource } from 'src/common/model/resource.model';
import { v1 } from 'uuid';
import { LeaveTypeModel } from './model/leavetype.model';

@Injectable()
export class LeavetypeService {
    private table_name = "l_main_leavetype";

    constructor(private readonly httpService: HttpService){}

    //find all tenant leavetype
    public findAll(userid: string, tenantid:string): Observable<any> {

        //url
        const url = DreamFactory.df_host+this.table_name+"?fields=LEAVE_TYPE_GUID%2CCODE%2CDESCRIPTION&filter=(TENANT_GUID="+tenantid+")";
 
        //call DF to validate the user
        return this.httpService.get(url);
        
    }

    //find tenant leavetype by id
    public findById(userid: string, tenantid:string, id: string): Observable<any> {
        //url
        const url = DreamFactory.df_host+this.table_name+"?fields=LEAVE_TYPE_GUID%2CCODE%2CDESCRIPTION&filter=(LEAVE_TYPE_GUID="+id+")AND(TENANT_GUID="+tenantid+")";
        
        //call DF to validate the user
        return this.httpService.get(url);
    }

    //create new branch
    create(user: any, code: string, description: string) {

        const resource = new Resource(new Array);
        const data = new LeaveTypeModel()

        data.LEAVE_TYPE_GUID = v1();
        data.CREATION_TS = new Date().toISOString();
        data.CREATION_USER_GUID = user.USER_GUID;
        data.ACTIVE_FLAG = 1;
        data.CODE = code;
        data.DESCRIPTION = description;
        data.TENANT_GUID = user.TENANT_GUID;

        resource.resource.push(data);

        const url = DreamFactory.df_host+this.table_name;

        return this.httpService.post(url,resource);

    }

    //update existing branch
    update(user:any, d: any) {

        // do a checking first to determine this data belong to user
        
        const resource = new Resource(new Array);
        const data = new LeaveTypeModel()

        data.LEAVE_TYPE_GUID = d.id;
        data.UPDATE_TS = new Date().toISOString();
        data.UPDATE_USER_GUID = user.USER_GUID;
        data.CODE = d.code;
        data.DESCRIPTION = d.description;
        data.TENANT_GUID = user.TENANT_GUID;

        resource.resource.push(data);

        const url = DreamFactory.df_host+this.table_name+"?id_field=TENANT_GUID%2CLEAVE_TYPE_GUID";

        return this.httpService.patch(url,resource);

    }
}

