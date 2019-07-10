import { Injectable, HttpService } from '@nestjs/common';
import { BaseDBService } from 'src/common/base/base-db.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { Observable } from 'rxjs';
import { Resource } from 'src/common/model/resource.model';
import { v1 } from 'uuid';
import { UserInviteModel } from '../model/user-invite.model';

/**
 * DB Service for invitation
 *
 * @export
 * @class InvitationDbService
 * @extends {BaseDBService}
 */
@Injectable()
export class InvitationDbService extends BaseDBService {
    /**
     * Declare tablename to use
     *
     * @private
     * @memberof InvitationDbService
     */
    private _tableName = 'l_user_invitation';

    /**
     *Creates an instance of InvitationDbService.
     * @param {HttpService} httpService Service for http
     * @param {QueryParserService} queryService Service for query
     * @memberof InvitationDbService
     */
    constructor(
        public readonly httpService: HttpService,
        public readonly queryService: QueryParserService
    ) {
        super(httpService, queryService, "l_user_invitation");
    }

    /**
     * Find all invitaion by tenantid
     *
     * @param {string} tenantid
     * @returns {Observable<any>}
     * @memberof InvitationDbService
     */
    public findAll(tenantid: string): Observable<any> {

        const fields = ['INVITATION_GUID', 'EMAIL', 'USER_GUID'];
        const filters = ['(TENANT_GUID=' + tenantid + ')'];

        const url = this.queryService.generateDbQuery(this._tableName, fields, filters);

        //call DF to validate the user
        return this.httpService.get(url);

    }

    /**
     * Find one invitation
     *
     * @param {string[]} filters
     * @returns {Observable<any>}
     * @memberof InvitationDbService
     */
    public findOne(filters: string[]): Observable<any> {

        const fields = ['INVITATION_GUID', 'EMAIL', 'USER_GUID', 'STATUS'];
        //const filters = ['(INVITATION_GUID='+token+')','(STATUS=1)'];

        const url = this.queryService.generateDbQuery(this._tableName, fields, filters);

        //call DF to validate the user
        return this.httpService.get(url);

    }

    /**
     * Create new invitation data
     *
     * @param {string} userId
     * @param {string} email
     * @param {*} user
     * @returns
     * @memberof InvitationDbService
     */
    create(userId: string, email: string, user: any) {
        const resource = new Resource(new Array());
        const invitationModel = new UserInviteModel();
        invitationModel.INVITATION_GUID = v1();
        invitationModel.USER_GUID = userId;
        invitationModel.TENANT_GUID = user.TENANT_GUID;
        invitationModel.EMAIL = email;
        invitationModel.STATUS = 1;
        invitationModel.CREATION_TS = new Date().toISOString();
        invitationModel.CREATION_TS = user.USER_GUID;

        resource.resource.push(invitationModel);

        return this.createByModel(resource, [], [], ['INVITATION_GUID,EMAIL']);
    }

    /**
     * Update existing invitation data status
     *
     * @param {string} id
     * @param {number} status
     * @returns
     * @memberof InvitationDbService
     */
    update(id: string, status: number) {
        const resource = new Resource(new Array());

        const data = new UserInviteModel();
        data.INVITATION_GUID = id;
        data.STATUS = status;

        resource.resource.push(data);

        return this.updateByModel(resource, [], [], []);
    }
}