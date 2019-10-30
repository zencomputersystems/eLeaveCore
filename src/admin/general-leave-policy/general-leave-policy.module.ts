import { GeneralLeavePolicyController } from './general-leave-policy.controller';
import { Module, HttpModule } from '@nestjs/common';
// import { AuthModule } from 'src/auth/auth.module';
// import { PassportModule } from '@nestjs/passport';
import { DreamFactory } from 'src/config/dreamfactory';
import { GeneralLeavePolicyService } from './general-leave-policy.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { XMLParserService } from '../../common/helper/xml-parser.service';
import { getModuleHttp } from '../../common/helper/basic-functions';


@Module({
	imports: [
		// AuthModule,
		// PassportModule.register({ session: false }),
		// HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } })
		getModuleHttp()
	],
	providers: [
		GeneralLeavePolicyService,
		QueryParserService,
		CommonFunctionService,
		XMLParserService
	],
	controllers: [GeneralLeavePolicyController]
})
export class GeneralLeavePolicyModule { }