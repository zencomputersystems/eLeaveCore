import { Module, HttpModule } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { UserService } from 'src/admin/user/user.service';
// import { AuthModule } from 'src/auth/auth.module';
// import { PassportModule } from '@nestjs/passport';
import { DreamFactory } from 'src/config/dreamfactory';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { InvitationDbService } from './db/invitation.db.service';
import { InvitationController } from './invitation.controller';
import { InvitationInviteService } from './invitation-invite.service';
import { EmailNodemailerService } from 'src/common/helper/email-nodemailer.service';
import { getModuleHttp } from '../../common/helper/basic-functions';
import { AuthDbService } from 'src/auth/auth.db.service';

/**
 * Module invitation
 *
 * @export
 * @class InvitationModule
 */
@Module({
  providers: [
    InvitationDbService,
    InvitationService,
    InvitationInviteService,
    UserService,
    QueryParserService,
    EmailNodemailerService,
    AuthDbService
  ],
  imports: [
    // AuthModule,
    // PassportModule.register({ session: false }),
    // HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } })
    getModuleHttp()

  ],
  controllers: [InvitationController]
})
export class InvitationModule { }
