import { Injectable, HttpService } from '@nestjs/common';
import { BaseDBService } from 'src/common/base/base-db.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { Observable } from 'rxjs';
import { CommonFunctionService } from 'src/common/helper/common-function.services';

/**
 * DB Service for department
 *
 * @export
 * @class DepartmentDbService
 * @extends {BaseDBService}
 */
@Injectable()
export class DepartmentDbService extends BaseDBService {
    private _tableName = "view_departments";

    constructor(
        public readonly httpService: HttpService,
        public readonly queryService: QueryParserService,
        public readonly commonFunctionService: CommonFunctionService) {
        super(httpService, queryService, "view_departments");
    }

    /**
     * Find all department by tenant id
     *
     * @param {string} tenantid
     * @returns {Observable<any>}
     * @memberof DepartmentDbService
     */
    public findAll(tenantid: string): Observable<any> {

        const fields = ['DEPARTMENT'];
        return this.commonFunctionService.findAllList(fields, tenantid, this.queryService, this.httpService, this._tableName);
        // const filters = ['(TENANT_GUID=' + tenantid + ')'];

        // const url = this.queryService.generateDbQueryV2(this._tableName, fields, filters, []);

        // //call DF to validate the user
        // return this.httpService.get(url);

    }


}