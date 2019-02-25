import { Injectable, HttpService } from '@nestjs/common';
import { v1 } from 'uuid';
import { MailerService } from '@nest-modules/mailer';
import { UserInviteModel } from './model/user-invite.model';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { DreamFactory } from 'src/config/dreamfactory';
import { Resource } from 'src/common/model/resource.model';
import { map, switchMap } from 'rxjs/operators';
import { Observable, from } from 'rxjs';

@Injectable()
export class UserInviteService {
    
    private _tableName = 'l_user_invitation';

    constructor(
        private readonly mailerService: MailerService,
        private readonly httpService: HttpService,
        private readonly queryParserService: QueryParserService
    ) {}
    
    async inviteUser(email: string,user: any) {
        // check if user already exist in database and active
        const isValidUser = true; // the invited user available in db
        const isInvitationAvailable = true; // read from subscription

        const userID = v1(); // take from database

        if(!isValidUser||!isInvitationAvailable)
            return null;

       try {
            const data = await this.create(userID, email, user);
            return this.sendEmail(email, data.data.resource[0].INVITATION_GUID);
        }
        catch (err) {
            return Promise.reject(null);
        }
       
    }

    private sendEmail(email: string, token: string) {
        this.mailerService
            .sendMail({
                to: email, // sender address
                from: 'wantan.wonderland.2018@gmail.com', // list of receivers
                subject: 'Testing Invitation System ✔',
                template: 'userinvitation.html',
                context: {  // Data to be sent to template files.
                    email: email,
                    code: token
                }
            });
                    
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

        const url = this.queryParserService.generateDbQuery(this._tableName,[],[]);

        return this.httpService.post(url,resource).toPromise();
    }

    acceptInvitation(token: string) {

    }
}
