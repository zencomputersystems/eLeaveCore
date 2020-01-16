import { Module, HttpModule } from '@nestjs/common';
import { CompanyService, CompanyDbService } from './company.service';
import { CompanyController } from './company.controller';
// import { AuthModule } from 'src/auth/auth.module';
// import { PassportModule } from '@nestjs/passport';
import { DreamFactory } from 'src/config/dreamfactory';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { CommonFunctionService } from '../../common/helper/common-function.services';
import { CompanySiteService, CompanySiteDbService } from './company-site.service';
import { CompanySiteController } from './company-site.controller';
import { getModuleHttp } from '../../common/helper/basic-functions';
import { UserInfoDbService } from '../holiday/db/user-info.db.service';
import { UserprofileDbService } from 'src/api/userprofile/db/userprofile.db.service';

/**
 * Module for company
 *
 * @export
 * @class CompanyModule
 */
@Module({
  imports: [
    // AuthModule,
    // PassportModule.register({ session: false }),
    // HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } })
    getModuleHttp()
  ],
  providers: [
    CompanyService,
    QueryParserService,
    CommonFunctionService,
    // CompanySiteService,
    // CompanySiteDbService,
    CompanyDbService,
    UserInfoDbService,
    UserprofileDbService
  ],
  controllers: [
    CompanyController,
    // CompanySiteController
  ]
})
export class CompanyModule { }
