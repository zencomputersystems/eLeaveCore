import { GeneralLeavePolicyController } from './general-leave-policy.controller';
import { Module } from '@nestjs/common';
import { GeneralLeavePolicyService } from './general-leave-policy.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { getModuleHttp } from '../../common/helper/basic-functions';


@Module({
	imports: [getModuleHttp()],
	providers: [
		GeneralLeavePolicyService,
		QueryParserService,
		CommonFunctionService
	],
	controllers: [GeneralLeavePolicyController]
})
export class GeneralLeavePolicyModule { }