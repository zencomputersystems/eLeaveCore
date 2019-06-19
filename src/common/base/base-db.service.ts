import { HttpService } from '@nestjs/common';
import { QueryParserService } from '../helper/query-parser.service';
import { Resource } from '../model/resource.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 *
 *
 * @export
 * @class BaseDBService
 */
export class BaseDBService {

    constructor(
        public httpService: HttpService,
        public queryService: QueryParserService,
        public tableName: string
    ) { }

    createByModel(resource: Resource, fields: string[], filters: string[], idFields: string[]) {
        return this.httpService.post(this.queryService.generateDbQueryV2(this.tableName, fields, filters, idFields), resource);
    }

    updateByModel(resource: Resource, fields: string[], filters: string[], idFields: string[]) {
        return this.httpService.patch(this.queryService.generateDbQueryV2(this.tableName, fields, filters, idFields), resource);
    }

    public findByFilterV3(fields: string[], filters: string[]): Observable<any> {

        //url
        const url = this.queryService.generateDbQueryV2(this.tableName, fields, filters, []);

        return this.httpService.get(url);
    }

    public findByFilterV2(fields: string[], filters: string[]): Observable<Array<any>> {

        //url
        const url = this.queryService.generateDbQueryV2(this.tableName, fields, filters, []);

        return this.httpService.get(url)
            .pipe(
                map(res => {
                    if (res.status == 200) {
                        return res.data.resource;
                    }
                })
            )
    }
}