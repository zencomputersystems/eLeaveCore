import { BaseDBService } from "src/common/base/base-db.service";
import { HttpService, Injectable } from "@nestjs/common";
import { QueryParserService } from "src/common/helper/query-parser.service";
import { Observable } from "rxjs";

@Injectable()
export class BranchDbService extends BaseDBService  {
    
    private _tableName = "view_branches";

    constructor(
        public readonly httpService: HttpService,
        public readonly queryService: QueryParserService){

        super(httpService,queryService,"view_branches");
    }

    //find all tenant branch
    public findAll(TENANT_GUID: string): Observable<any> {

        const fields = ['BRANCH'];
        const filters = ['(TENANT_GUID='+TENANT_GUID+')'];

        //url
        const url = this.queryService.generateDbQueryV2(this._tableName,fields,filters,[]);
 
        //call DF to validate the user
        return this.httpService.get(url);
        
    }

    //find tenant branch by name
    public findByName(name: string, TENANT_GUID:string): Observable<any> {

        const fields = ['BRANCH'];
        const filters = ['(BRANCH ='+name+')','(TENANT_GUID='+TENANT_GUID+')'];

        //url
        const url = this.queryService.generateDbQueryV2(this._tableName,fields,filters,[]);
        
        //call DF to validate the user
        return this.httpService.get(url);
    }

}