import { Module, HttpModule } from '@nestjs/common';
import { UserInfoController } from './user-info.controller';
import { UserInfoService } from './user-info.service';
import { PassportModule } from '@nestjs/passport';
import { DreamFactory } from 'src/config/dreamfactory';
import { AuthModule } from 'src/auth/auth.module';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { XMLParserService } from 'src/common/helper/xml-parser.service';

/**
 * Module for user-info
 *
 * @export
 * @class UserInfoModule
 */
@Module({
  controllers: [UserInfoController],
  providers: [
    UserInfoService,
    QueryParserService,
    XMLParserService
  ],
  modules: [
    AuthModule,
    PassportModule.register({ session: false }),
    HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } }),
  ]
})
export class UserInfoModule { }
