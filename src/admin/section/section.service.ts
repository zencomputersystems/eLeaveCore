import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DreamFactory } from 'src/config/dreamfactory';
import { Resource } from 'src/common/model/resource.model';
import { v1 } from 'uuid';
import { SectionModel } from './model/section.model';
import { QueryParserService } from 'src/common/helper/query-parser.service';

@Injectable()
export class SectionService {

    private table_name = "main_section";

    constructor(private readonly httpService: HttpService, private readonly queryService: QueryParserService){}

    //find all tenant branch
    public findAll(userid: string, tenantid:string): Observable<any> {

        const fields = ['SECTION_GUID','NAME'];
        const filters = ['(TENANT_GUID='+tenantid+')'];
       
        const url = this.queryService.generateDbQuery(this.table_name,fields,filters);

        //call DF to validate the user
        return this.httpService.get(url);
        
    }

    //find tenant branch by id
    public findById(userid: string, tenantid:string, id: string): Observable<any> {
       
        const fields = ['SECTION_GUID','NAME'];
        const filters = ['(TENANT_GUID='+tenantid+')','(SECTION_GUID='+id+')'];
       
        const url = this.queryService.generateDbQuery(this.table_name,fields,filters);
        
        //call DF to validate the user
        return this.httpService.get(url);
    }

    //create new branch
    create(user: any, name: string) {

        const resource = new Resource(new Array);
        const data = new SectionModel();

        data.SECTION_GUID = v1();
        data.CREATION_TS = new Date().toISOString();
        data.CREATION_USER_GUID = user.USER_GUID;
        data.ACTIVE_FLAG = 1;
        data.NAME = name;
        data.TENANT_GUID = user.TENANT_GUID;

        resource.resource.push(data);

        const url = DreamFactory.df_host+this.table_name;

        return this.httpService.post(this.queryService.generateDbQuery(this.table_name,[],[]),resource);

    }

    //update existing branch
    update(user:any, d: any) {

        // do a checking first to determine this data belong to user
        
        const resource = new Resource(new Array);
        const data = new SectionModel()

        data.SECTION_GUID = d.id;
        data.UPDATE_TS = new Date().toISOString();
        data.UPDATE_USER_GUID = user.USER_GUID;
        data.NAME = d.name;
        data.TENANT_GUID = user.TENANT_GUID;

        resource.resource.push(data);

        const url = DreamFactory.df_host+this.table_name+"?id_field=SECTION_GUID";

        return this.httpService.patch(url,resource);

    }
}
