import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DreamFactory } from 'src/config/dreamfactory';
import { Resource } from 'src/common/model/resource.model';
import { v1 } from 'uuid';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { DepartmentModel } from './model/department.model';
import { filter } from 'rxjs/operators';

@Injectable()
export class DepartmentService {
    private _table_name = "main_department";

    constructor(private readonly httpService: HttpService, private readonly queryService: QueryParserService){}

    //find all tenant branch
    public findAll(userid: string, tenantid:string): Observable<any> {

        const fields = ['DEPARTMENT_GUID','NAME'];
        const filters = ['(TENANT_GUID='+tenantid+')'];
       
        const url = this.queryService.generateDbQueryV2(this._table_name,fields,filters,[]);

        //call DF to validate the user
        return this.httpService.get(url);
        
    }

    //find tenant branch by id
    public findById(userid: string, tenantid:string, id: string): Observable<any> {
        const fields = ['DEPARTMENT_GUID','NAME'];
        const filters = ['(DEPARTMENT_GUID='+id+')','(TENANT_GUID='+tenantid+')'];

        //url
        const url = this.queryService.generateDbQueryV2(this._table_name,fields,filters,[]);
        
        //call DF to validate the user
        return this.httpService.get(url);
    }

    //create new department
    create(user: any, name: string) {
        const resource = new Resource(new Array);

        const data = new DepartmentModel();
        data.DEPARTMENT_GUID = v1();
        data.NAME = name;
        data.TENANT_GUID = user.TENANT_GUID;
        data.CREATION_TS = user.USER_GUID;
        data.ACTIVE_FLAG = 1;
        data.CREATION_TS = new Date().toISOString();

        resource.resource.push(data);

        return this.createByModel(resource,[],[],[]);
        
    }

    createByModel(resource: Resource, fields: string[], filters: string[], idFields:string[]) {
        const url = this.queryService.generateDbQueryV2(this._table_name,fields,filters,idFields);

        return this.httpService.post(url,resource);
    }

    //update existing department
    update(user:any, d: any) {
        const resource = new Resource(new Array);
        const data = new DepartmentModel();

        data.DEPARTMENT_GUID = d.id;
        data.UPDATE_TS = new Date().toISOString();
        data.UPDATE_USER_GUID = user.USER_GUID;
        data.NAME = d.name;
        data.TENANT_GUID = user.TENANT_GUID;

        resource.resource.push(data);

        return this.updateByModel(resource,[],[],[]);
    }

    updateByModel(resource: Resource, fields: string[], filters: string[], idFields: string[]) {
        const url = this.queryService.generateDbQueryV2(this._table_name,fields,filters,idFields);

        return this.httpService.patch(url,resource);

    }
}
