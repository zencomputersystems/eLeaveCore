import { Module, HttpModule } from '@nestjs/common';
import { LeavetypeEntitlementController } from './leavetype-entitlement.controller';
import { LeavetypeEntitlementDbService } from './db/leavetype-entitlement.db.service';
import { DreamFactory } from 'src/config/dreamfactory';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { LeaveTypeEntitlementService } from './leavetype-entitlement.service';

@Module({
  controllers: [LeavetypeEntitlementController],
  modules: [
    AuthModule,
    PassportModule.register({session: false}),
    HttpModule.register({headers:{'Content-Type':'application/json','X-Dreamfactory-API-Key':DreamFactory.df_key}})
  ],
  providers: [
    LeaveTypeEntitlementService,
    LeavetypeEntitlementDbService,
    QueryParserService,
    XMLParserService
  ]
})
export class LeavetypeEntitlementModule {}
