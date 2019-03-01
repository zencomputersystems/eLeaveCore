import { HttpService } from "@nestjs/common";
import { QueryParserService } from "../helper/query-parser.service";
import { Resource } from "../model/resource.model";
import { Observable } from "rxjs";

export class BaseDBService {

    constructor(
        public httpService: HttpService,
        public queryService: QueryParserService,
        public tableName: string
    ) {}
    
    createByModel(resource: Resource,fields: string[], filters: string[], idFields: string[]) {
        return this.httpService.post(this.queryService.generateDbQueryV2(this.tableName,fields,filters,idFields),resource);
    }

    updateByModel(resource: Resource, fields: string[], filters: string[], idFields: string[]) {
        return this.httpService.patch(this.queryService.generateDbQueryV2(this.tableName,fields,filters,idFields),resource);
    }

    //find tenant branch by name
    public findByFilter(fields: string[], filters: string[]): Observable<any> {

        //url
        const url = this.queryService.generateDbQueryV2(this.tableName,fields,filters,[]);
        
        return this.httpService.get(url);
    }
}