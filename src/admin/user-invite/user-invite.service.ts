import { Injectable } from '@nestjs/common';
import { v1 } from 'uuid';
import { MailerService } from '@nest-modules/mailer';

@Injectable()
export class UserInviteService {
    
    constructor(private readonly mailerService: MailerService) {}
    
    inviteUser(email: string) {
        // check if user already exist in database and active
        const isValidUser = true;

        if(!isValidUser)
            return null;
        
        //create unique token
        const token = v1();

        //send an activation link to user via email
        return this
        .mailerService
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

    acceptInvitation(token: string) {

    }
}
