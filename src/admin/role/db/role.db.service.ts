import { BaseDBService } from 'src/common/base/base-db.service';
import { HttpService, Injectable } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { Observable } from 'rxjs';
import { CommonFunctionService } from '../../../common/helper/common-function.services';

/**
 * DB service for role
 *
 * @export
 * @class RoleDbService
 * @extends {BaseDBService}
 */
@Injectable()
export class RoleDbService extends BaseDBService {
    /**
     * Declare tablename l_role_profile
     *
     * @private
     * @memberof RoleDbService
     */
    private _tableName = "l_role_profile";

    /**
     *Creates an instance of RoleDbService.
     * @param {HttpService} httpService Service for http
     * @param {QueryParserService} queryService Service for query
     * @param {CommonFunctionService} commonFunctionService Common function service
     * @memberof RoleDbService
     */
    constructor(
        public readonly httpService: HttpService,
        public readonly queryService: QueryParserService,
        public readonly commonFunctionService: CommonFunctionService) {
        super(httpService, queryService, "l_role_profile");
    }

    /**
     * Method find all role - list all role profile
     *
     * @returns {Observable<any>}
     * @memberof RoleDbService
     */
    public findAllRoleProfile(): Observable<any> {

        const fields = ['ROLE_GUID', 'CODE', 'DESCRIPTION'];
        const filters = ['(DELETED_AT IS NULL)'];

        // const url = this.queryService.generateDbQueryV2(this._tableName, fields, filters, []);

        //call DF to validate the user
        // return this.httpService.get(url);

        return this.commonFunctionService.findAllData([fields, filters, this.queryService, this.httpService, this._tableName]);

    }

    /**
     * Method find all role detail
     *
     * @param {string} roleProfileId
     * @returns {Observable<any>}
     * @memberof RoleDbService
     */
    public findAll(roleProfileId: string): Observable<any> {

        const fields = ['PROPERTIES_XML'];
        const filters = ['(ROLE_GUID=' + roleProfileId + ')'];

        // const url = this.queryService.generateDbQueryV2(this._tableName, fields, filters, []);

        // //call DF to validate the user
        // return this.httpService.get(url);

        return this.commonFunctionService.findAllData([fields, filters, this.queryService, this.httpService, this._tableName]);
    }



}