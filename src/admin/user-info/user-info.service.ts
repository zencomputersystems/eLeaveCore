import { Injectable, HttpService } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { Observable, of } from 'rxjs';
import { Resource } from 'src/common/model/resource.model';
import { v1 } from 'uuid';
import { CreateUserDTO } from './dto/create-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UserInfoModel } from './model/user-info.model';
import { UserDto } from './dto/user.dto';
import { BaseDBService } from 'src/common/base/base-db.service';
import { IDbService } from 'src/interface/IDbService';
/** XMLparser from zen library  */
var { convertJsonToXML } = require('@zencloudservices/xmlparser');

/**
 * Service for user-info
 *
 * @export
 * @class UserInfoService
 * @extends {BaseDBService}
 * @implements {IDbService}
 */
@Injectable()
export class UserInfoService extends BaseDBService implements IDbService {

    /**
     * Declare tablename user info
     *
     * @private
     * @memberof UserInfoService
     */
    private _tableName = 'user_info';

    /**
     *Creates an instance of UserInfoService.
     * @param {HttpService} httpService  Service for http
     * @param {QueryParserService} queryService Service for query
     * @memberof UserInfoService
     */
    constructor(
        public readonly httpService: HttpService,
        public readonly queryService: QueryParserService) {
        super(httpService, queryService, 'user_info');
    }

    /**
     * fields to get
     *
     * @private
     * @memberof UserInfoService
     */
    private fields = [
        'USER_INFO_GUID',
        'FULLNAME',
        'PROPERTIES_XML',
        'BRANCH',
        'DEPARTMENT',
        'DESIGNATION',
        'COSTCENTRE',
        'SECTION',
        'JOIN_DATE',
        'CONFIRMATION_DATE',
        'RESIGNATION_DATE',
        'EMPLOYEE_STATUS',
        'EMPLOYEE_TYPE',
        'ROLE_GUID',
        'CALENDAR_GUID',
    ];

    /**
     * Find single user
     *
     * @param {string} userId
     * @param {string} tenantId
     * @returns {Observable<any>}
     * @memberof UserInfoService
     */
    public findOne(userId: string, tenantId: string): Observable<any> {
        const filters = ['(USER_GUID=' + userId + ')'];

        const url = this.queryService.generateDbQuery(this._tableName, this.fields, filters);

        return this.httpService.get(url);

    }

    // /**
    //  * find one data
    //  *
    //  * @param {string} userId
    //  * @param {string} tenantId
    //  * @returns
    //  * @memberof UserInfoService
    //  */
    // public findOneData(userId: string, tenantId: string) {
    //     const filters = ['(USER_GUID=' + userId + ') LIMIT 1'];

    //     const url = this.queryService.generateDbQuery(this._tableName, this.fields, filters);

    //     return of(this.httpService.get(url));

    // }

    // /**
    //  * Find all user-info
    //  *
    //  * @param {string} TENANT_GUID
    //  * @returns {Observable<any>}
    //  * @memberof UserInfoService
    //  */
    // findAll(TENANT_GUID: string): Observable<any> {
    //     throw new Error('Method not implemented.');
    // }

    // /**
    //  * Find user info by id
    //  *
    //  * @param {*} USERINFO_GUID
    //  * @param {string} id
    //  * @returns {Observable<any>}
    //  * @memberof UserInfoService
    //  */
    // findById(USERINFO_GUID: any, id: string): Observable<any> {
    //     throw new Error('Method not implemented.');
    // }

    /**
     * Create new user info
     *
     * @param {*} user
     * @param {CreateUserDTO} d
     * @returns
     * @memberof UserInfoService
     */
    create(user: any, d: CreateUserDTO) {

        const resource = new Resource(new Array);

        const data = this.mapData(d, user.USER_GUID);

        data.USER_INFO_GUID = v1();
        data.CREATION_USER_GUID = user.USER_GUID;
        data.CREATION_TS = new Date().toISOString();
        data.USER_GUID = user.USER_GUID;

        resource.resource.push(data);

        return this.createByModel(resource, [], [], []);

    }


    /**
     * Update existing user-info
     *
     * @param {*} user
     * @param {UpdateUserDTO} d
     * @returns
     * @memberof UserInfoService
     */
    update(user: any, d: UpdateUserDTO) {

        //do a leavetype checking to validate leave_type_guid belong to this tenant

        const resource = new Resource(new Array);
        const data = this.mapData(d, user.USER_GUID);

        data.USER_INFO_GUID = d.id;

        resource.resource.push(data);
        console.log(resource);
        return this.updateByModel(resource, [], [], []);
    }

    /**
     * Method to map data input and database table
     *
     * @param {UserDto} d
     * @param {string} userId
     * @returns
     * @memberof UserInfoService
     */
    public mapData(d: UserDto, userId: string) {
        const data = new UserInfoModel();

        // data.USER_GUID = userId;

        data.DESIGNATION = d.employmentDetail.designationId;
        data.DEPARTMENT = d.employmentDetail.departmentId;
        data.BRANCH = d.employmentDetail.branchId;
        data.TENANT_COMPANY_GUID = d.employmentDetail.companyId;

        data.EMPLOYEE_TYPE = 'Intern';
        data.FULLNAME = d.employeeName;
        data.JOIN_DATE = d.employmentDetail.joinDate; // .toDateString();
        data.CONFIRMATION_DATE = d.employmentDetail.confirmationDate; // .toDateString();
        data.RESIGNATION_DATE = d.employmentDetail.resignationDate; // .toDateString();
        data.MANAGER_USER_GUID = d.employmentDetail.reportingToId;
        data.EMPLOYEE_STATUS = d.employmentDetail.employmentStatus;

        const xmldata = d;
        xmldata.employmentDetail = null;
        data.PROPERTIES_XML = convertJsonToXML(xmldata);

        return data;
    }
}
