import { Injectable, HttpService } from "@nestjs/common";
import { BaseDBService } from "src/common/base/base-db.service";
import { QueryParserService } from "src/common/helper/query-parser.service";
import { Observable } from "rxjs";
import { Resource } from "src/common/model/resource.model";
import { v1 } from "uuid";
import { UserInviteModel } from "../model/user-invite.model";

/**
 *
 *
 * @export
 * @class InvitationDbService
 * @extends {BaseDBService}
 */
@Injectable()
export class InvitationDbService extends BaseDBService {
    private _tableName = 'l_user_invitation';

    constructor(
        public readonly httpService: HttpService,
        public readonly queryService: QueryParserService
    ) {
        super(httpService,queryService,"l_user_invitation");
    }

     //find all tenant branch
     public findAll(tenantid:string): Observable<any> {

        const fields = ['INVITATION_GUID','EMAIL','USER_GUID'];
        const filters = ['(TENANT_GUID='+tenantid+')'];
       
        const url = this.queryService.generateDbQuery(this._tableName,fields,filters);

        //call DF to validate the user
        return this.httpService.get(url);
        
    }

    //find all tenant branch
    public findOne(filters:string[]): Observable<any> {

        const fields = ['INVITATION_GUID','EMAIL','USER_GUID','STATUS'];
        //const filters = ['(INVITATION_GUID='+token+')','(STATUS=1)'];
       
        const url = this.queryService.generateDbQuery(this._tableName,fields,filters);

        //call DF to validate the user
        return this.httpService.get(url);
                  
    }

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

        return this.createByModel(resource,[],[],['INVITATION_GUID,EMAIL']);
    }

    update(id: string,status: number) {
        const resource = new Resource(new Array());

        const data = new UserInviteModel();
        data.INVITATION_GUID = id;
        data.STATUS = status;

        resource.resource.push(data);

        return this.updateByModel(resource,[],[],[]);
    }
}