import { MailerService } from '@nest-modules/mailer';

import { HttpService, Injectable } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { UserService } from 'src/admin/user/user.service';
import { InvitationDbService } from './db/invitation.db.service';
import { InviteDTO } from './dto/invite.dto';
import { map, mergeMap } from 'rxjs/operators';
import { UserModel } from 'src/admin/user/model/user.model';
import { EmailList } from './dto/email-list';
import { Resource } from 'src/common/model/resource.model';
import { v1 } from 'uuid';
import { of, forkJoin } from 'rxjs';
import { UserInviteModel } from './model/user-invite.model';

/**
 *
 *
 * @export
 * @class InvitationInviteService
 */
@Injectable()
export class InvitationInviteService {

    constructor(
        private readonly inviteDbService: InvitationDbService,
        private readonly mailerService: MailerService,
        public readonly httpService: HttpService,
        public readonly queryService: QueryParserService,
        private readonly userService: UserService
    ) {
    }

    public invite(inviteList: Array<InviteDTO>, user: any) {

        const userFilter = ['(TENANT_GUID=' + user.TENANT_GUID + ')', '(ACTIVATION_FLAG=0)']

        return this.userService.findByFilterV2([], userFilter)
            .pipe(
                map(res => {
                    return this.filterUser(inviteList, res);
                }),
                mergeMap(res => {
                    return this.checkInvitationStatus(res, user.TENANT_GUID);
                }),
                mergeMap(res => this.saveInvitation(res, user)),
                mergeMap((res) => {
                    const observableEmail$ = [];

                    res.forEach(element => {
                        observableEmail$.push(this.sendEmail(element.email, element.invitationId));
                    });

                    return forkJoin(observableEmail$);
                })
            )
    }

    private filterUser(inviteList: Array<InviteDTO>, userList: Array<UserModel>) {

        const successList = new Array<EmailList>()
        // check if invitelist user exist in userlist

        for (let i = 0; i < inviteList.length; i++) {

            const checkUser = userList.find(x => x.USER_GUID.toString() === inviteList[i].id.toString());

            if (checkUser) {
                successList.push(new EmailList(checkUser.USER_GUID, '', checkUser.EMAIL, checkUser.EMAIL));
            }
        }

        // inviteList.forEach(element => {
        //     const checkUser = userList.find(x=>x.USER_GUID===element.id);
        //     if(checkUser) {
        //         successList.push(new EmailList(checkUser.USER_GUID,'',checkUser.EMAIL,checkUser.EMAIL));
        //     }
        // });

        return successList;
    }

    private checkInvitationStatus(inviteList: Array<EmailList>, tenantId: string) {

        return this.inviteDbService.findAll(tenantId)
            .pipe(
                map(res => {
                    if (res.status == 200) {
                        const data: Array<UserInviteModel> = res.data.resource;

                        const mailList = new Array<EmailList>();

                        for (let i = 0; i < inviteList.length; i++) {
                            const checkInvitation = data.find(x => x.USER_GUID === inviteList[i].userId);

                            if (checkInvitation) {
                                // resend email to user
                                mailList.push(new EmailList(checkInvitation.USER_GUID, checkInvitation.INVITATION_GUID, checkInvitation.EMAIL, checkInvitation.EMAIL));
                            } else {
                                // store user into invitation db and send email
                                mailList.push(inviteList[i]);
                            }
                        }

                        // inviteList.forEach(element => {
                        //     const checkInvitation = data.find(x=>x.USER_GUID === element.userId);

                        //     if(checkInvitation) {
                        //         // resend email to user
                        //         mailList.push(new EmailList(checkInvitation.USER_GUID,checkInvitation.INVITATION_GUID,checkInvitation.EMAIL,checkInvitation.EMAIL));
                        //     } else {
                        //         // store user into invitation db and send email
                        //         mailList.push(element);
                        //     }
                        // });

                        return mailList;
                    }
                })
            )

    }

    private saveInvitation(inviteList: Array<EmailList>, user: any) {

        const inviteResourceArray = new Resource(new Array);
        const emailList = new Array<EmailList>();

        for (let i = 0; i < inviteList.length; i++) {
            if (inviteList[i].invitationId == null || inviteList[i].invitationId == '') {
                const data = new UserInviteModel();
                data.INVITATION_GUID = v1();
                data.STATUS = 1;
                data.USER_GUID = inviteList[i].userId;
                data.CREATION_TS = user.USER_GUID;
                data.TENANT_GUID = user.TENANT_GUID;
                data.CREATION_TS = new Date().toISOString();
                data.EMAIL = inviteList[i].email;

                inviteResourceArray.resource.push(data);
            } else {
                emailList.push(inviteList[i]);
            }
        }

        // inviteList.forEach(element => {
        //     if(element.invitationId==null||element.invitationId=='') {
        //         const data = new UserInviteModel();
        //         data.INVITATION_GUID = v1();
        //         data.STATUS = 1;
        //         data.USER_GUID = element.userId;
        //         data.CREATION_TS = user.USER_GUID;
        //         data.TENANT_GUID = user.TENANT_GUID;
        //         data.CREATION_TS = new Date().toISOString();
        //         data.EMAIL = element.email;

        //         inviteResourceArray.resource.push(data);
        //     } else {
        //         emailList.push(element);
        //     }
        // });


        if (inviteResourceArray.resource.length == 0) {
            return of(inviteList);
        }

        return this.inviteDbService.createByModel(inviteResourceArray, [], [], ['EMAIL', 'INVITATION_GUID', 'USER_GUID'])
            .pipe(map(res => {

                if (res.status == 200) {

                    const data = res.data.resource;

                    data.forEach(element => {
                        emailList.push(new EmailList(element.USER_GUID, element.INVITATION_GUID, element.EMAIL, element.EMAIL));
                    });


                    return emailList;
                }
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
                    code: "http://zencore.zen.com.my:3000/api/invitation/" + token
                }
            });
    }
}