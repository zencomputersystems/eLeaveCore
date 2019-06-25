import { Injectable, HttpService } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Resource } from 'src/common/model/resource.model';
import { v1 } from 'uuid';
import { LeaveTypeModel } from './model/leavetype.model';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { BaseDBService } from 'src/common/base/base-db.service';
import { IDbService } from 'src/interface/IDbService';

/**
 * Service for leavetype
 *
 * @export
 * @class LeavetypeService
 * @extends {BaseDBService}
 * @implements {IDbService}
 */
@Injectable()
export class LeavetypeService extends BaseDBService implements IDbService {

    private table_name = "l_main_leavetype";

    constructor(
        public readonly httpService: HttpService,
        public readonly queryService: QueryParserService) {
        super(httpService, queryService, "l_main_leavetype");
    }


    /**
     * Find all tenant leavetype
     *
     * @param {string} tenantid
     * @returns {Observable<any>}
     * @memberof LeavetypeService
     */
    public findAll(tenantid: string): Observable<any> {

        const fields = ['LEAVE_TYPE_GUID', 'CODE', 'DESCRIPTION'];
        const filters = ['(TENANT_GUID=' + tenantid + ')'];
        //url
        const url = this.queryService.generateDbQuery(this.table_name, fields, filters);

        //call DF to validate the user
        return this.httpService.get(url);

    }


    /**
     * Find tenant leavetype by id
     *
     * @param {string} tenantid
     * @param {string} id
     * @returns {Observable<any>}
     * @memberof LeavetypeService
     */
    public findById(tenantid: string, id: string): Observable<any> {

        const fields = ['LEAVE_TYPE_GUID', 'CODE', 'DESCRIPTION'];
        const filters = ['(TENANT_GUID=' + tenantid + ')', '(LEAVE_TYPE_GUID=' + id + ')'];
        //url
        const url = this.queryService.generateDbQuery(this.table_name, fields, filters);


        //call DF to validate the user
        return this.httpService.get(url);
    }

    /**
     * Create new leavetype
     *
     * @param {*} user
     * @param {*} data
     * @returns
     * @memberof LeavetypeService
     */
    create(user: any, data: any) {

        const resource = new Resource(new Array);
        const modelData = new LeaveTypeModel()

        modelData.LEAVE_TYPE_GUID = v1();
        modelData.CREATION_TS = new Date().toISOString();
        modelData.CREATION_USER_GUID = user.USER_GUID;
        modelData.ACTIVE_FLAG = 1;
        modelData.CODE = data.code;
        modelData.DESCRIPTION = data.description;
        modelData.TENANT_GUID = user.TENANT_GUID;
        modelData.TENANT_COMPANY_GUID = "test";

        resource.resource.push(modelData);

        console.log(resource);
        return this.createByModel(resource, [], [], []);
    }

    /**
     * Update existing leavetype
     *
     * @param {*} user
     * @param {*} d
     * @returns
     * @memberof LeavetypeService
     */
    update(user: any, d: any) {

        // do a checking first to determine this data belong to user

        const resource = new Resource(new Array);
        const data = new LeaveTypeModel()

        data.LEAVE_TYPE_GUID = d.id;
        data.UPDATE_TS = new Date().toISOString();
        data.UPDATE_USER_GUID = user.USER_GUID;
        data.CODE = d.code;
        data.DESCRIPTION = d.description;
        data.TENANT_GUID = user.TENANT_GUID;

        resource.resource.push(data);

        return this.updateByModel(resource, [], [], []);

    }
}

