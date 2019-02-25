import { Module, HttpModule } from '@nestjs/common';
import { UserInviteController } from './user-invite.controller';
import { UserInviteService } from './user-invite.service';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { DreamFactory } from 'src/config/dreamfactory';
import { QueryParserService } from 'src/common/helper/query-parser.service';

@Module({
  controllers: [UserInviteController],
  providers: [
    UserInviteService,
    QueryParserService
  ],
  modules: [
    AuthModule,
    PassportModule.register({session: false}),
    HttpModule.register({headers:{'Content-Type':'application/json','X-Dreamfactory-API-Key':DreamFactory.df_key}})
  ]
})
export class UserInviteModule {}
