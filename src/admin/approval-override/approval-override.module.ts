import { Module, HttpModule } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';
import { ApprovalOverrideService } from './approval-override.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { ApprovalOverrideController } from './approval-override.controller';
import { DreamFactory } from 'src/config/dreamfactory';
import { LeaveTransactionDbService } from 'src/api/leave/db/leave-transaction.db.service';
import { DateCalculationService } from 'src/common/calculation/service/date-calculation.service';

@Module({
	modules: [
		AuthModule,
		PassportModule.register({ session: false }),
		HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } })
	],
	providers: [
		ApprovalOverrideService,
		QueryParserService,
		CommonFunctionService,
    XMLParserService,
    LeaveTransactionDbService,
    DateCalculationService
	],
	controllers: [ApprovalOverrideController]
})
export class ApprovalOverrideModule { }