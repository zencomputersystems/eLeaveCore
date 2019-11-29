import { Module } from '@nestjs/common';
import { UserInfoController } from './user-info.controller';
import { UserInfoService } from './user-info.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { getModuleHttp } from '../../common/helper/basic-functions';

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
    QueryParserService
  ],
  imports: [
    getModuleHttp()
  ]
})
export class UserInfoModule { }
