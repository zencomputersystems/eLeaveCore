import { Injectable, HttpService } from '@nestjs/common';
import { parse } from 'fast-xml-parser';
import { Resource } from 'src/common/model/resource.model';
import { LeaveTypeEntitlementModel } from '../model/leavetype_entitlement.model';
import { v1 } from 'uuid';
import { Observable } from 'rxjs';
import { UpdateLeaveTypeEntitlementDto } from '../dto/update-leavetype_entitlement.dto';
import { map } from 'rxjs/operators';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { BaseDBService } from 'src/common/base/base-db.service';
import { IDbService } from 'src/interface/IDbService';
import { CreateLeaveEntitlementTypeDTO } from '../dto/create-leavetype_entitlement.dto';

/**
 * DB Service for leavetype entitlement
 *
 * @export
 * @class LeavetypeEntitlementDbService
 * @extends {BaseDBService}
 * @implements {IDbService}
 */
@Injectable()
export class LeavetypeEntitlementDbService extends BaseDBService implements IDbService {

    /**
     * Declare tablename entitlement def
     *
     * @private
     * @memberof LeavetypeEntitlementDbService
     */
    private _tableName = "l_leavetype_entitlement_def";
    /**
     * Declare viewtable leave type setup
     *
     * @private
     * @memberof LeavetypeEntitlementDbService
     */
    private _viewTableName = 'view_leave_type_setup';

    /**
     *Creates an instance of LeavetypeEntitlementDbService.
     * @param {HttpService} httpService Service for http
     * @param {QueryParserService} queryService Service for query
     * @param {XMLParserService} xmlParserService Service for XMLJSON converter
     * @memberof LeavetypeEntitlementDbService
     */
    constructor(
        public readonly httpService: HttpService,
        public readonly queryService: QueryParserService,
        private readonly xmlParserService: XMLParserService) {
        super(httpService, queryService, "l_leavetype_entitlement_def");
    }

    /**
     * Find all tenant leave definition
     *
     * @param {string} tenantid
     * @returns {Observable<any>}
     * @memberof LeavetypeEntitlementDbService
     */
    public findAll(tenantid: string): Observable<any> {

        const filters = ['(TENANT_GUID=' + tenantid + ')'];
        //url
        const url = this.queryService.generateDbQueryV2(this._viewTableName, [], filters, []);

        //call DF to validate the user
        return this.httpService.get(url);

    }

    /**
     * Find tenant leave definition by id
     *
     * @param {string} tenantid
     * @param {string} id
     * @returns {Observable<any>}
     * @memberof LeavetypeEntitlementDbService
     */
    public findById(tenantid: string, id: string): Observable<any> {

        const fields = ['LEAVE_TYPE_CODE', 'ENTITLEMENT_GUID', 'LEAVE_ENTITLEMENT_CODE', 'DESCRIPTION', 'PROPERTIES_XML'];
        const filters = ['(ENTITLEMENT_GUID=' + id + ')', '(TENANT_GUID=' + tenantid + ')'];

        const url = this.queryService.generateDbQuery(this._viewTableName, fields, filters);


        //call DF to validate the user
        return this.httpService.get(url);
    }

    /**
     * Create new leavetype entitlement
     *
     * @param {*} user
     * @param {CreateLeaveEntitlementTypeDTO} d
     * @returns {Observable<any>}
     * @memberof LeavetypeEntitlementDbService
     */
    create(user: any, d: CreateLeaveEntitlementTypeDTO): Observable<any> {

        //do a leavetype checking to validate leave_type_guid belong to this tenant

        const resource = new Resource(new Array);
        const data = new LeaveTypeEntitlementModel();

        data.CODE = d.code;
        data.DESCRIPTION = d.description;
        data.PROPERTIES_XML = this.xmlParserService.convertJsonToXML(d.properties);

        data.ENTITLEMENT_GUID = v1();
        data.LEAVE_TYPE_GUID = d.leavetype_id;
        data.TENANT_GUID = user.TENANT_GUID;
        data.TENANT_COMPANY_GUID = "323bdfa7-eed2-8bf2-2274-b1cd9390c9ca";
        data.CREATION_TS = new Date().toISOString();
        data.CREATION_USER_GUID = user.USER_GUID;
        data.ACTIVE_FLAG = 1;

        resource.resource.push(data);

        return this.createByModel(resource, [], [], []);
    }

    /**
     * Update existing leavetype entitlement
     *
     * @param {*} user
     * @param {UpdateLeaveTypeEntitlementDto} d
     * @returns {Observable<any>}
     * @memberof LeavetypeEntitlementDbService
     */
    update(user: any, d: UpdateLeaveTypeEntitlementDto): Observable<any> {

        //do a leavetype checking to validate leave_type_guid belong to this tenant

        const resource = new Resource(new Array);
        const data = new LeaveTypeEntitlementModel();

        data.ENTITLEMENT_GUID = d.id;
        data.TENANT_GUID = user.TENANT_GUID;
        data.CODE = d.code;
        data.DESCRIPTION = d.description;
        data.PROPERTIES_XML = this.xmlParserService.convertJsonToXML(d.properties);
        data.UPDATE_TS = new Date().toISOString();
        data.UPDATE_USER_GUID = user.USER_GUID;
        data.ACTIVE_FLAG = 1;

        resource.resource.push(data);

        return this.updateByModel(resource, [], [], []);

    }


}
