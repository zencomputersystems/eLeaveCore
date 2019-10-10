import { Module, HttpModule } from '@nestjs/common';
import { CompanyService, CompanyServiceRef1 } from './company.service';
import { CompanyController } from './company.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { DreamFactory } from 'src/config/dreamfactory';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { CommonFunctionService } from '../../common/helper/common-function.services';
import { CompanySiteService, CompanySiteServiceRef1 } from './company-site.service';
import { CompanySiteController } from './company-site.controller';

/**
 * Module for company
 *
 * @export
 * @class CompanyModule
 */
@Module({
  imports: [
    AuthModule,
    PassportModule.register({ session: false }),
    HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } })
  ],
  providers: [
    CompanyService,
    QueryParserService,
    CommonFunctionService,
    CompanySiteService,
    CompanySiteServiceRef1,
    CompanyServiceRef1
  ],
  controllers: [CompanyController, CompanySiteController]
})
export class CompanyModule { }
