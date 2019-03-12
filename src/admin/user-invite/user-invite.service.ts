import { Injectable, HttpService } from '@nestjs/common';
import { v1 } from 'uuid';
import { MailerService } from '@nest-modules/mailer';
import { UserInviteModel } from './model/user-invite.model';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { Resource } from 'src/common/model/resource.model';
import { map, flatMap} from 'rxjs/operators';
import {forkJoin, Observable, of} from 'rxjs';
import { UserService } from '../user/user.service';
import { UserModel } from '../user/model/user.model';
import { InviteValidList } from './dto/invite-valid-list.dto';
import { InviteDto } from './dto/invite.dto';
import { BaseDBService } from 'src/common/base/base-db.service';

@Injectable()
export class UserInviteService extends BaseDBService {
    
    private _tableName = 'l_user_invitation';
    private _user: any;

    constructor(
        private readonly mailerService: MailerService,
        public readonly httpService: HttpService,
        public readonly queryService: QueryParserService,
        private readonly userService: UserService
    ) {
        super(httpService,queryService,"l_user_invitation");
    }
    
    public inviteUser(inviteList:[InviteDto],user: any) {

        this._user = user;

        // check if user already exist in database and active
        const isInvitationAvailable = true; // read from subscription


        const observableData$ = [
            this.userService.findByFilter(['(TENANT_GUID='+user.TENANT_GUID+')']),

            //get all invitation data for this tenant
            this.findAll(user.TENANT_GUID)
        ]

        return forkJoin(observableData$)
                .pipe(
                    map(res => this.getValidInvitationData(res[0].data.resource,res[1].data.resource, inviteList)),
                    flatMap(res => this.processValidEmail(res))
                )  
    }


    private getValidInvitationData(userData: [UserModel], userInviteData: [UserInviteModel], inviteData: [InviteDto]) {
        // based on the invitation list, get valid email
        const validList = new Array<InviteValidList>();

        inviteData.forEach(element => {
            // check if user exist in main table
            const checkUserData = userData.find(x=>(x.USER_GUID === element.id)&&(x.ACTIVATION_FLAG==0));
            const checkUserInvitation = userInviteData.find(x=>x.USER_GUID==element.id);

            console.log(checkUserData);
            if((checkUserData!=null || checkUserData !=undefined)) {
                
                if(checkUserInvitation==null || checkUserInvitation == undefined) {
                    validList.push(new InviteValidList(checkUserData.USER_GUID,checkUserData.EMAIL,''))
                } else {
                    if(checkUserInvitation.STATUS!=3) {
                        validList.push(new InviteValidList(checkUserData.USER_GUID,checkUserData.EMAIL,checkUserInvitation.INVITATION_GUID))   
                    }
                }

            }
        });

        return validList;
    }

    private processValidEmail(validList: Array<InviteValidList>) {
        // for item without INVITATION_GUID, we need to insert the data into table
        // after that we send them an invitation email
        // for item with INVITATION_GUID, we resend invitation email

        if(validList.length==0) {
            return of(validList);
        }

        const emailObs$ = [];

        validList.forEach(element => {
           if(element.INVITATION_GUID!=null&&element.INVITATION_GUID!='') {
                // send invitation email
                emailObs$.push(this.sendEmail(element.EMAIL,element.INVITATION_GUID));
           } else {
                // insert data into table and send email
                emailObs$.push(this.processNewInvitation(element));
           }
        });

        return forkJoin(emailObs$);
    }

    private processNewInvitation(inviteData: InviteValidList) {
        //add data into table
        return this.create(inviteData.USER_GUID,inviteData.EMAIL,this._user)
                    .pipe(flatMap(res=>{
                        const result = res.data.resource[0];

                        return this.sendEmail(result.EMAIL,result.INVITATION_GUID);
                    }))
    }

    // send email to user
    private sendEmail(email: string, token: string) {
        return this.mailerService
            .sendMail({
                to: email, // sender address
                from: 'wantan.wonderland.2018@gmail.com', // list of receivers
                subject: 'Testing Invitation System ✔',
                template: 'userinvitation.html',
                context: {  // Data to be sent to template files.
                    email: email,
                    code: "http://localhost:3000/api/employee/invitation/accept/"+token
                }
            });
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