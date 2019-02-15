import { Module, HttpModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { DreamFactory } from 'src/config/dreamfactory';
import { UserInfoService } from './user-info.service';
import { AuthModule } from 'src/auth/auth.module';
import { QueryParserService } from 'src/common/helper/query-parser.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    UserInfoService,
    QueryParserService
  ],
  modules:[
    PassportModule.register({session: false}),
    HttpModule.register({headers:{'Content-Type':'application/json','X-Dreamfactory-API-Key':DreamFactory.df_key}})
  ]
})
export class UserModule {}
