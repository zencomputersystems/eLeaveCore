import { HttpService } from '@nestjs/common';
import { QueryParserService } from '../helper/query-parser.service';
import { Resource } from '../model/resource.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Base function for Database
 *
 * @export
 * @class BaseDBService
 */
export class BaseDBService {

    /**
     *Creates an instance of BaseDBService.
     * @param {HttpService} httpService
     * @param {QueryParserService} queryService
     * @param {string} tableName
     * @memberof BaseDBService
     */
    constructor(
        public httpService: HttpService,
        public queryService: QueryParserService,
        public tableName: string
    ) { }

    /**
     * Method create
     *
     * @param {Resource} resource
     * @param {string[]} fields
     * @param {string[]} filters
     * @param {string[]} idFields
     * @returns
     * @memberof BaseDBService
     */
    createByModel(resource: Resource, fields: string[], filters: string[], idFields: string[]) {
        return this.httpService.post(this.queryService.generateDbQueryV2(this.tableName, fields, filters, idFields), resource);
    }

    /**
     * Method update
     *
     * @param {Resource} resource
     * @param {string[]} fields
     * @param {string[]} filters
     * @param {string[]} idFields
     * @returns
     * @memberof BaseDBService
     */
    updateByModel(resource: Resource, fields: string[], filters: string[], idFields: string[]) {
        return this.httpService.patch(this.queryService.generateDbQueryV2(this.tableName, fields, filters, idFields), resource);
    }

    /**
     * Find by filter v3
     *
     * @param {string[]} fields
     * @param {string[]} filters
     * @returns {Observable<any>}
     * @memberof BaseDBService
     */
    public findByFilterV3(fields: string[], filters: string[]): Observable<any> {

        //url
        const url = this.queryService.generateDbQueryV2(this.tableName, fields, filters, []);

        return this.httpService.get(url);
    }

    /**
     * Find by filter v2
     *
     * @param {string[]} fields
     * @param {string[]} filters
     * @returns {Observable<Array<any>>}
     * @memberof BaseDBService
     */
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