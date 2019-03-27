import { Module, HttpModule } from '@nestjs/common';
import { ApplyController } from './controller/apply/apply.controller';
import { ApplyLeaveService } from './service/apply-leave.service';
import { UserLeaveEntitlementDbService } from '../userprofile/db/user-leave-entitlement.db.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { DreamFactory } from 'src/config/dreamfactory';

@Module({
  modules: [
    HttpModule.register({headers:{'Content-Type':'application/json','X-Dreamfactory-API-Key':DreamFactory.df_key}}),
  ],
  controllers: [ApplyController],
  providers: [
    ApplyLeaveService,
    QueryParserService,
    UserLeaveEntitlementDbService
  ],
})
export class LeaveModule {}
