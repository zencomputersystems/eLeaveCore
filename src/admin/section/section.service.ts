import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { DreamFactory } from 'src/config/dreamfactory';
import { Resource } from 'src/common/model/resource.model';
import { v1 } from 'uuid';
import { SectionModel } from './model/section.model';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { BaseDBService } from 'src/common/base/base-db.service';
import { IDbService } from 'src/interface/IDbService';

/**
 * Service for section
 *
 * @export
 * @class SectionService
 * @extends {BaseDBService}
 * @implements {IDbService}
 */
@Injectable()
export class SectionService extends BaseDBService implements IDbService {

    /**
     * Declare tablename main_section
     *
     * @private
     * @memberof SectionService
     */
    private _tableName = "main_section";

    /**
     *Creates an instance of SectionService.
     * @param {HttpService} httpService Service for http
     * @param {QueryParserService} queryService Service for query
     * @memberof SectionService
     */
    constructor(
        public readonly httpService: HttpService,
        public readonly queryService: QueryParserService) {
        super(httpService, queryService, "main_section");
    }

    /**
     * Find all section
     *
     * @param {string} tenantid
     * @returns {Observable<any>}
     * @memberof SectionService
     */
    public findAll(tenantid: string): Observable<any> {

        const fields = ['SECTION_GUID', 'NAME'];
        const filters = ['(TENANT_GUID=' + tenantid + ')'];

        const url = this.queryService.generateDbQuery(this._tableName, fields, filters);

        //call DF to validate the user
        return this.httpService.get(url);

    }

    /**
     * Find section by id
     *
     * @param {string} tenantid
     * @param {string} id
     * @returns {Observable<any>}
     * @memberof SectionService
     */
    public findById(tenantid: string, id: string): Observable<any> {

        const fields = ['SECTION_GUID', 'NAME'];
        const filters = ['(TENANT_GUID=' + tenantid + ')', '(SECTION_GUID=' + id + ')'];

        const url = this.queryService.generateDbQuery(this._tableName, fields, filters);

        //call DF to validate the user
        return this.httpService.get(url);
    }

    /**
     * Create new section
     *
     * @param {*} user
     * @param {string} name
     * @returns
     * @memberof SectionService
     */
    create(user: any, name: string) {
        const data = new SectionModel();
        data.SECTION_GUID = v1();
        let resourceData = this.createProcess(user, name, data);
        return this.createByModel(resourceData, [], [], []);
    }

    /**
     * Update existing section
     *
     * @param {*} user
     * @param {*} d
     * @returns
     * @memberof SectionService
     */
    update(user: any, d: any) {

        // do a checking first to determine this data belong to user

        const resource = new Resource(new Array);
        const data = new SectionModel()

        data.SECTION_GUID = d.id;
        data.UPDATE_TS = new Date().toISOString();
        data.UPDATE_USER_GUID = user.USER_GUID;
        data.NAME = d.name;
        data.TENANT_GUID = user.TENANT_GUID;

        resource.resource.push(data);

        return this.updateByModel(resource, [], [], []);

    }

    /**
     * Process to create new data
     *
     * @param {*} user
     * @param {*} name
     * @param {*} data
     * @returns
     * @memberof SectionService
     */
    public createProcess(user, name, data) {
        const resource = new Resource(new Array);

        data.CREATION_TS = new Date().toISOString();
        data.CREATION_USER_GUID = user.USER_GUID;
        data.ACTIVE_FLAG = 1;
        data.NAME = name;
        data.TENANT_GUID = user.TENANT_GUID;

        resource.resource.push(data);

        return resource;

    }

}
