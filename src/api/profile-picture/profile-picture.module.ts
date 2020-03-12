import { ProfilePictureService, ProfilePictureDbService } from './profile-picture.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { Module } from '@nestjs/common';
import { getModuleHttp } from 'src/common/helper/basic-functions';
import { ProfilePictureController } from './profile-picture.controller';
import { UserprofileDbService } from '../userprofile/db/userprofile.db.service';

@Module({
  imports: [
    getModuleHttp()
  ],
  providers: [
    ProfilePictureService,
    QueryParserService,
    ProfilePictureDbService,
    UserprofileDbService
  ],
  controllers: [
    ProfilePictureController
  ]
})
export class ProfilePictureModule { }