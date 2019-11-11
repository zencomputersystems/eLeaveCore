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
     * @param {HttpService} httpService Service for http from base db file
     * @param {QueryParserService} queryService Service for query from base db file
     * @param {string} tableName Table name declaration from base db file
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

    /**
     * With order and limit
     *
     * @param {string[]} fields
     * @param {string[]} filters
     * @param {string} order
     * @param {number} limit
     * @returns {Observable<Array<any>>}
     * @memberof BaseDBService
     */
    public findByFilterV4(fields: string[], filters: string[], order: string, limit: number): Observable<Array<any>> {
        //url
        const url = this.queryService.generateDbQueryV3([this.tableName, fields, filters, order, limit]);
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