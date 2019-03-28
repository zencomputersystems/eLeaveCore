import { Module, HttpModule } from '@nestjs/common';
import { ApplyController } from './controller/apply/apply.controller';
import { ApplyLeaveService } from './service/apply-leave.service';
import { UserLeaveEntitlementDbService } from '../userprofile/db/user-leave-entitlement.db.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { DreamFactory } from 'src/config/dreamfactory';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { LeaveApplicationValidationService } from 'src/common/policy/leave-application-validation/services/leave-application-validation.service';
import { UserInfoService } from 'src/admin/user-info/user-info.service';
import { DateCalculationService } from 'src/common/calculation/service/date-calculation.service';

@Module({
  modules: [
    HttpModule.register({headers:{'Content-Type':'application/json','X-Dreamfactory-API-Key':DreamFactory.df_key}}),
  ],
  controllers: [ApplyController],
  providers: [
    ApplyLeaveService,
    QueryParserService,
    UserLeaveEntitlementDbService,
    XMLParserService,
    LeaveApplicationValidationService,
    UserInfoService,
    DateCalculationService
  ],
})
export class LeaveModule {}
