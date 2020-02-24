import { Module, HttpModule } from '@nestjs/common';
// import { AuthModule } from 'src/auth/auth.module';
// import { PassportModule } from '@nestjs/passport';
import { ApprovalOverrideService, ApprovalOverrideServiceRef1, ApprovalOverrideServiceRef2, ApprovalOverrideServiceRef4 } from './approval-override.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { ApprovalOverrideController } from './approval-override.controller';
import { DreamFactory } from 'src/config/dreamfactory';
import { LeaveTransactionDbService } from 'src/api/leave/db/leave-transaction.db.service';
import { DateCalculationService } from 'src/common/calculation/service/date-calculation.service';
import { UserService } from '../user/user.service';
import { EmailNodemailerService } from 'src/common/helper/email-nodemailer.service';
import { UserInfoService } from '../user-info/user-info.service';
import { getModuleHttp } from '../../common/helper/basic-functions';
import { UserprofileDbService } from 'src/api/userprofile/db/userprofile.db.service';
import { CompanyDbService } from '../company/company.service';
import { LeavetypeService } from '../leavetype/leavetype.service';
import { PendingLeaveService } from './pending-leave.service';
import { LeaveTransactionLogDbService } from 'src/api/leave/db/leave-transaction-log.db.service';

@Module({
	imports: [
		// AuthModule,
		// PassportModule.register({ session: false }),
		// HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } })
		getModuleHttp()
	],
	providers: [
		ApprovalOverrideService,
		QueryParserService,
		CommonFunctionService,
		LeaveTransactionDbService,
		DateCalculationService,
		UserService,
		EmailNodemailerService,
		UserInfoService,
		UserprofileDbService,
		CompanyDbService,
		LeavetypeService,
		PendingLeaveService,
		ApprovalOverrideServiceRef1, ApprovalOverrideServiceRef2, ApprovalOverrideServiceRef4,
		LeaveTransactionLogDbService
	],
	controllers: [ApprovalOverrideController]
})
export class ApprovalOverrideModule { }