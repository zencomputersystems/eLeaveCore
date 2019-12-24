import { Module } from '@nestjs/common';
import { UserInfoDetailsController } from './user-info-details.controller';
import { UserInfoDetailsService } from './user-info-details.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { UserInfoDbService } from '../holiday/db/user-info.db.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { getModuleHttp } from '../../common/helper/basic-functions';
import { UserInfoActivateService } from './user-info-activate.service';
import { UserprofileDbService } from 'src/api/userprofile/db/userprofile.db.service';

@Module({
  imports: [getModuleHttp()],
  providers: [
    QueryParserService,
    CommonFunctionService,
    UserInfoDetailsService,
    UserInfoDbService,
    UserInfoActivateService,
    UserprofileDbService
  ],
  controllers: [UserInfoDetailsController]
})
export class UserInfoDetailsModule { }