import { GeneralLeavePolicyController } from './general-leave-policy.controller';
import { Module } from '@nestjs/common';
import { GeneralLeavePolicyService } from './general-leave-policy.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { getModuleHttp } from '../../common/helper/basic-functions';
import { ApplyAnniversaryLeaveService } from '../year-end-closing/service/apply-anniversary-leave.service';
import { LeaveTransactionDbService } from 'src/api/leave/db/leave-transaction.db.service';
import { DateCalculationService } from 'src/common/calculation/service/date-calculation.service';


@Module({
	imports: [getModuleHttp()],
	providers: [
		GeneralLeavePolicyService,
		QueryParserService,
		CommonFunctionService,
		ApplyAnniversaryLeaveService,
		LeaveTransactionDbService,
		DateCalculationService
	],
	controllers: [GeneralLeavePolicyController]
})
export class GeneralLeavePolicyModule { }