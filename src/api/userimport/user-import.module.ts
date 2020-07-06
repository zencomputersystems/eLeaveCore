import { Module, HttpModule, BadRequestException } from '@nestjs/common';
import { UserImportController } from './user-import.controller';
import { UserImportService } from './user-import.service';
import { PassportModule } from '@nestjs/passport';
import { DreamFactory } from 'src/config/dreamfactory';
import { UserService } from 'src/admin/user/user.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { UserInfoService } from 'src/admin/user-info/user-info.service';
import { MulterModule } from '@nestjs/platform-express';
import { getModuleHttp } from '../../common/helper/basic-functions';
import { PendingLeaveService } from '../../admin/approval-override/pending-leave.service';
import { UserprofileDbService } from '../userprofile/db/userprofile.db.service';
import { CompanyDbService } from 'src/admin/company/company.service';
import { LeavetypeService } from 'src/admin/leavetype/leavetype.service';
import { SubscriptionDbService } from './subscription.db.service';


/**
 * Module for user import
 *
 * @export
 * @class UserImportModule
 */
@Module({
  controllers: [UserImportController],
  providers: [
    UserImportService,
    UserService,
    QueryParserService,
    UserInfoService,
    PendingLeaveService,
    UserprofileDbService,
    CompanyDbService,
    LeavetypeService,
    SubscriptionDbService
  ],
  imports: [
    PassportModule.register({ session: false }),
    // HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } }),
    getModuleHttp(),
    MulterModule.register({
      fileFilter: function fileFilter(req, file, cb) {
        if (file.mimetype != "text/csv" && file.mimetype != "application/vnd.ms-excel")
          return cb(new BadRequestException('Only CSV are allowed'), false);
        else
          cb(null, true);
      }
    })
  ]
})
export class UserImportModule { }
