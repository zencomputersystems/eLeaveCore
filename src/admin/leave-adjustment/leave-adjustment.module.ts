import { Module, HttpModule } from '@nestjs/common';
// import { AuthModule } from 'src/auth/auth.module';
// import { PassportModule } from '@nestjs/passport';
import { LeaveAdjustmentService } from './leave-adjustment.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { LeaveAdjustmentController } from './leave-adjustment.controller';
import { DreamFactory } from 'src/config/dreamfactory';
import { UserLeaveEntitlementDbService } from 'src/api/userprofile/db/user-leave-entitlement.db.service';
import { getModuleHttp } from '../../common/helper/basic-functions';

@Module({
  imports: [
    // AuthModule,
    // PassportModule.register({ session: false }),
    // HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } })
    getModuleHttp()
  ],
  providers: [
    LeaveAdjustmentService,
    QueryParserService,
    CommonFunctionService,
    UserLeaveEntitlementDbService
  ],
  controllers: [LeaveAdjustmentController]
})
export class LeaveAdjustmentModule { }