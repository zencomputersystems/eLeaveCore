import { Injectable, HttpService } from '@nestjs/common';
import { BaseDBService } from 'src/common/base/base-db.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { Observable } from 'rxjs';

/**
 * DB Service for designation
 *
 * @export
 * @class DesignationDbService
 * @extends {BaseDBService}
 */
@Injectable()
export class DesignationDbService extends BaseDBService {
    private _tableName = "view_designations";

    constructor(
        public readonly httpService: HttpService,
        public readonly queryService: QueryParserService) {
        super(httpService, queryService, "view_designations");
    }

    /**
     * Find all designation by tenant id
     *
     * @param {string} tenantid
     * @returns {Observable<any>}
     * @memberof DesignationDbService
     */
    public findAll(tenantid: string): Observable<any> {

        const fields = ['DESIGNATION'];
        const filters = ['(TENANT_GUID=' + tenantid + ')'];

        const url = this.queryService.generateDbQueryV2(this._tableName, fields, filters, []);

        //call DF to validate the user
        return this.httpService.get(url);

    }
}