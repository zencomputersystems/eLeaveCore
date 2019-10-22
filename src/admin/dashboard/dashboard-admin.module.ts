import { DashboardAdminService } from './dashboard-admin.service';
import { DashboardAdminController } from './dashboard-admin.controller';
import { Module, HttpModule } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { DreamFactory } from 'src/config/dreamfactory';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { UserInfoDbService } from '../holiday/db/user-info.db.service';

@Module({
  imports: [
    AuthModule,
    PassportModule.register({ session: false }),
    HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } })
  ],
  providers: [
    DashboardAdminService,
    QueryParserService,
    CommonFunctionService,
    UserInfoDbService
  ],
  controllers: [DashboardAdminController]
})
export class DashboardAdminModule { }