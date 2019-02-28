import { Module, HttpModule } from '@nestjs/common';
import { InvitationService } from './invitation.service';
import { InvitationController } from './invitation.controller';
import { UserService } from 'src/admin/user/user.service';
import { UserInviteService } from 'src/admin/user-invite/user-invite.service';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { DreamFactory } from 'src/config/dreamfactory';
import { QueryParserService } from 'src/common/helper/query-parser.service';

@Module({
  providers: [
    InvitationService,
    UserService,
    UserInviteService,
    QueryParserService
  ],
  modules: [
    AuthModule,
    PassportModule.register({session: false}),
    HttpModule.register({headers:{'Content-Type':'application/json','X-Dreamfactory-API-Key':DreamFactory.df_key}})

  ],
  controllers: [InvitationController]
})
export class InvitationModule {}
