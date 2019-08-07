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
    /**
     * Declare viewtable departments
     *
     * @private
     * @memberof DepartmentDbService
     */
    private _tableName = "view_departments";

    /**
     *Creates an instance of DepartmentDbService.
     * @param {HttpService} httpService Service for http
     * @param {QueryParserService} queryService Service for query 
     * @param {CommonFunctionService} commonFunctionService Service for commonfunction
     * @memberof DepartmentDbService
     */
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
        return this.commonFunctionService.findAllList([fields, tenantid, this.queryService, this.httpService, this._tableName]);

    }

    /**
     * find by company
     *
     * @param {string} tenantId
     * @param {string} companyId
     * @returns {Observable<any>}
     * @memberof DepartmentDbService
     */
    public findByCompany(tenantId: string, companyId: string): Observable<any> {

        const fields = ['DEPARTMENT'];
        const filters = ['(TENANT_COMPANY_GUID=' + companyId + ')', '(TENANT_GUID=' + tenantId + ')'];

        const url = this.queryService.generateDbQueryV2(this._tableName, fields, filters, []);
        let result = this.httpService.get(url);
        return this.commonFunctionService.getListData(result);
    }


}