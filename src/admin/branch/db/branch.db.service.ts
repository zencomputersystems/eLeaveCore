import { BaseDBService } from 'src/common/base/base-db.service';
import { HttpService, Injectable } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { Observable } from 'rxjs';
import { CommonFunctionService } from 'src/common/helper/common-function.services';

/**
 * table setup and function service for branch
 *
 * @export
 * @class BranchDbService
 * @extends {BaseDBService}
 */
@Injectable()
export class BranchDbService extends BaseDBService {

    /**
     * Declare viewtable branch
     *
     * @private
     * @memberof BranchDbService
     */
    private _tableName = "view_branches";

    /**
     *Creates an instance of BranchDbService.
     * @param {HttpService} httpService Service for http
     * @param {QueryParserService} queryService Service for query
     * @param {CommonFunctionService} commonFunctionService Service for commonfunction
     * @memberof BranchDbService
     */
    constructor(
        public readonly httpService: HttpService,
        public readonly queryService: QueryParserService,
        public readonly commonFunctionService: CommonFunctionService) {

        super(httpService, queryService, "view_branches");
    }


    /**
     * find all tenant branch
     *
     * @param {string} TENANT_GUID
     * @returns {Observable<any>}
     * @memberof BranchDbService
     */
    public findAll(TENANT_GUID: string): Observable<any> {

        const fields = ['BRANCH'];
        return this.commonFunctionService.findAllList(fields, TENANT_GUID, this.queryService, this.httpService, this._tableName);
        // const filters = ['(TENANT_GUID=' + TENANT_GUID + ')'];

        // //url
        // const url = this.queryService.generateDbQueryV2(this._tableName, fields, filters, []);

        // //call DF to validate the user
        // return this.httpService.get(url);

    }


    /**
     * find tenant branch by name
     *
     * @param {string} name
     * @param {string} TENANT_GUID
     * @returns {Observable<any>}
     * @memberof BranchDbService
     */
    public findByName(name: string, TENANT_GUID: string): Observable<any> {

        const fields = ['BRANCH'];
        const filters = ['(BRANCH =' + name + ')', '(TENANT_GUID=' + TENANT_GUID + ')'];

        //url
        const url = this.queryService.generateDbQueryV2(this._tableName, fields, filters, []);

        //call DF to validate the user
        return this.httpService.get(url);
    }

}