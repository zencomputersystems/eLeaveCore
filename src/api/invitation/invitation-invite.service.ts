// import { MailerService } from "@nest-modules/mailer";

// import { HttpService } from "@nestjs/common";
// import { QueryParserService } from "src/common/helper/query-parser.service";
// import { UserService } from "src/admin/user/user.service";
// import { InviteDto } from "src/admin/user-invite/dto/invite.dto";
// import { forkJoin, of } from "rxjs";
// import { map, flatMap } from "rxjs/operators";
// import { UserModel } from "src/admin/user/model/user.model";
// import { UserInviteModel } from "src/admin/user-invite/model/user-invite.model";
// import { InviteValidList } from "src/admin/user-invite/dto/invite-valid-list.dto";
// import { InvitationDbService } from "./db/invitation.db.service";

// export class InvitationInviteService {

//     constructor(
//         private readonly inviteDbService: InvitationDbService,
//         private readonly mailerService: MailerService,
//         public readonly httpService: HttpService,
//         public readonly queryService: QueryParserService,
//         private readonly userService: UserService
//     ){}

//     public inviteUser(inviteList:[InviteDto],user: any) {

//         // check if user already exist in database and active
//         const isInvitationAvailable = true; // read from subscription


//         const observableData$ = [
//             this.userService.findByFilter(['(TENANT_GUID='+user.TENANT_GUID+')']),

//             //get all invitation data for this tenant
//             this.inviteDbService.findAll(user.TENANT_GUID)
//         ]

//         return forkJoin(observableData$)
//                 .pipe(
//                     map(res => this.getValidInvitationData(res[0].data.resource,res[1].data.resource, inviteList)),
//                     flatMap(res => this.processValidEmail(res))
//                 )  
//     }


//     private getValidInvitationData(userData: [UserModel], userInviteData: [UserInviteModel], inviteData: [InviteDto]) {
//         // based on the invitation list, get valid email
//         const validList = new Array<InviteValidList>();

//         inviteData.forEach(element => {
//             // check if user exist in main table
//             const checkUserData = userData.find(x=>(x.USER_GUID === element.id)&&(x.ACTIVATION_FLAG==0));
//             const checkUserInvitation = userInviteData.find(x=>x.USER_GUID==element.id);

//             console.log(checkUserData);
//             if((checkUserData!=null || checkUserData !=undefined)) {
                
//                 if(checkUserInvitation==null || checkUserInvitation == undefined) {
//                     validList.push(new InviteValidList(checkUserData.USER_GUID,checkUserData.EMAIL,''))
//                 } else {
//                     if(checkUserInvitation.STATUS!=3) {
//                         validList.push(new InviteValidList(checkUserData.USER_GUID,checkUserData.EMAIL,checkUserInvitation.INVITATION_GUID))   
//                     }
//                 }

//             }
//         });

//         return validList;
//     }

//     private processValidEmail(validList: Array<InviteValidList>) {
//         // for item without INVITATION_GUID, we need to insert the data into table
//         // after that we send them an invitation email
//         // for item with INVITATION_GUID, we resend invitation email

//         if(validList.length==0) {
//             return of(validList);
//         }

//         const emailObs$ = [];

//         validList.forEach(element => {
//            if(element.INVITATION_GUID!=null&&element.INVITATION_GUID!='') {
//                 // send invitation email
//                 emailObs$.push(this.sendEmail(element.EMAIL,element.INVITATION_GUID));
//            } else {
//                 // insert data into table and send email
//                 emailObs$.push(this.processNewInvitation(element));
//            }
//         });

//         return forkJoin(emailObs$);
//     }

//     private processNewInvitation(inviteData: InviteValidList) {
//         //add data into table
//         return this.inviteDbService.create(inviteData.USER_GUID,inviteData.EMAIL,this._user)
//                     .pipe(flatMap(res=>{
//                         const result = res.data.resource[0];

//                         return this.sendEmail(result.EMAIL,result.INVITATION_GUID);
//                     }))
//     }

//     // send email to user
//     private sendEmail(email: string, token: string) {
//         return this.mailerService
//             .sendMail({
//                 to: email, // sender address
//                 from: 'wantan.wonderland.2018@gmail.com', // list of receivers
//                 subject: 'Testing Invitation System ✔',
//                 template: 'userinvitation.html',
//                 context: {  // Data to be sent to template files.
//                     email: email,
//                     code: "http://localhost:3000/api/employee/invitation/accept/"+token
//                 }
//             });
//     }
// }