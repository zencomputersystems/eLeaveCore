import { Module } from '@nestjs/common';
import { ProfileDefaultController } from './profile-default.controller';
import { getModuleHttp } from 'src/common/helper/basic-functions';
import { ProfileDefaultService } from './profile-default.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { ProfileDefaultDbService } from './profile-default.db.service';

@Module({
  controllers: [ProfileDefaultController],
  imports: [
    getModuleHttp()
  ],
  providers: [
    ProfileDefaultService,
    QueryParserService,
    CommonFunctionService,
    ProfileDefaultDbService
  ]
})
export class ProfileDefaultModule { }