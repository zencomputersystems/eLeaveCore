import { Injectable, HttpService } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { UserModel } from './model/user.model';
import { Resource } from 'src/common/model/resource.model';
import { v1 } from 'uuid';
import { Observable } from 'rxjs';
import { BaseDBService } from 'src/common/base/base-db.service';

/**
 * Service for user
 *
 * @export
 * @class UserService
 * @extends {BaseDBService}
 */
@Injectable()
export class UserService extends BaseDBService {

    /**
     * Declare tablename user main
     *
     * @private
     * @memberof UserService
     */
    private table_name = 'user_main';
    /**
     *Creates an instance of UserService.
     * @param {HttpService} httpService Service for http
     * @param {QueryParserService} queryService Service for query
     * @memberof UserService
     */
    constructor(
        public readonly httpService: HttpService,
        public readonly queryService: QueryParserService) {
        super(httpService, queryService, "user_main")
    }


    /**
     * Method find email
     *
     * @param {string[]} userId
     * @returns {Observable<any>}
     * @memberof UserService
     */
    public findEmail(userId: string[]): Observable<any> {

        const fields = ['USER_GUID', 'EMAIL'];
        //const filters = ['(EMAIL='+email+')','(PASSWORD='+CryptoJS.SHA256(password.trim()).toString(CryptoJS.enc.Hex)+')'];
        const filters = ['(USER_GUID IN (' + userId + '))'];

        const url = this.queryService.generateDbQuery(this.table_name, fields, filters);

        //call DF to validate the user
        return this.httpService.get(url);

    }

    /**
     * Find single user
     *
     * @param {string} email
     * @param {string} password
     * @returns {Promise<any>}
     * @memberof UserService
     */
    public async findOne(email: string, password: string): Promise<any> {

        const fields = ['USER_GUID', 'EMAIL', 'TENANT_GUID'];
        //const filters = ['(EMAIL='+email+')','(PASSWORD='+CryptoJS.SHA256(password.trim()).toString(CryptoJS.enc.Hex)+')'];
        const filters = ['(EMAIL=' + email + ')', '(PASSWORD=' + password + ')'];

        // console.log(filters);

        const url = this.queryService.generateDbQuery(this.table_name, fields, filters);

        //call DF to validate the user
        return this.httpService.get(url).toPromise();

    }

    // // pass list of filter and get the data
    // public findByFilter(filters: Array<string>): Observable<any> {

    //     const fields = ['USER_GUID','EMAIL','TENANT_GUID','ACTIVATION_FLAG'];

    //     const url = this.queryService.generateDbQuery(this.table_name,fields,filters);

    //     //call DF to validate the user
    //     return this.httpService.get(url);
    // }

    /**
     * FindOne user ByPayload
     *
     * @param {*} payload
     * @returns {Promise<any>}
     * @memberof UserService
     */
    public async findOneByPayload(payload): Promise<any> {
        const fields = ['USER_GUID', 'EMAIL', 'TENANT_GUID'];
        const filters = ['(EMAIL=' + payload.email + ')', '(TENANT_GUID=' + payload.tenantId + ')']

        const url = this.queryService.generateDbQuery(this.table_name, fields, filters);

        //call DF to validate the user
        return this.httpService.get(url).toPromise();
    }

    /**
     * Create new user
     *
     * @param {*} user
     * @param {*} d
     * @returns
     * @memberof UserService
     */
    public create(user: any, d: any) {

        const data = new UserModel();

        data.USER_GUID = v1();
        data.TENANT_GUID = user.TENANT_GUID;
        data.LOGIN_ID = d.email;

        const resource = new Resource(new Array);
        resource.resource.push(data);

        return this.createByModel(resource, [], [], []);

    }

    /**
     * Update user inactive
     *
     * @param {*} user
     * @param {string} user_guid
     * @returns
     * @memberof UserService
     */
    public updateUserInactive(user: any, user_guid: string) {
        const resource = new Resource(new Array);
        const data = new UserModel;

        data.ACTIVATION_FLAG = 0;
        data.UPDATE_TS = new Date().toISOString();
        data.UPDATE_USER_GUID = user.USER_GUID;

        resource.resource.push(data);
        // console.log(resource);

        return this.updateByModel(resource, [], ['(USER_GUID=' + user_guid + ')'], ['USER_GUID', 'EMAIL']);
    }

}
