import { Module, HttpModule } from '@nestjs/common';
import { UserprofileService } from './userprofile.service';
import { PersonalDetailController } from './controller/personal-detail/personal-detail.controller';
import { EmploymentDetailController } from './controller/employment-detail/employment-detail.controller';
import { LeaveEntitlementController } from './controller/leave-entitlement/leave-entitlement.controller';
import { CertificationDetailController } from './controller/certification-detail/certification-detail.controller';
import { UserprofileController } from './controller/userprofile/userprofile.controller';
import { UserInfoService } from 'src/admin/user-info/user-info.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { DreamFactory } from 'src/config/dreamfactory';
import { AccessLevelValidateService } from 'src/common/helper/access-level-validate.service';

@Module({
  providers: [
    UserprofileService,
    UserInfoService,
    QueryParserService,
    XMLParserService,
    AccessLevelValidateService
  ],
  modules:[
    HttpModule.register({headers:{'Content-Type':'application/json','X-Dreamfactory-API-Key':DreamFactory.df_key}}),
  ],
  controllers: [
    PersonalDetailController,
    EmploymentDetailController,
    LeaveEntitlementController,
    CertificationDetailController,
    UserprofileController],
})
export class UserprofileModule {}
