import { Module, HttpModule } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { PassportModule } from '@nestjs/passport';
import { DreamFactory } from 'src/config/dreamfactory';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { getModuleHttp } from '../../common/helper/basic-functions';

/**
 * Module for user
 *
 * @export
 * @class UserModule
 */
@Module({
  controllers: [
    UserController],
  providers: [
    UserService,
    QueryParserService
  ],
  imports: [
    PassportModule.register({ session: false }),
    // HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } })
    getModuleHttp()
  ]
})
export class UserModule { }
