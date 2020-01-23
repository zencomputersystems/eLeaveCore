import { Module, HttpModule } from '@nestjs/common';
import { MasterSetupController } from './master-setup.controller';
// import { AuthModule } from 'src/auth/auth.module';
// import { PassportModule } from '@nestjs/passport';
import { DreamFactory } from 'src/config/dreamfactory';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { MasterSetupService } from './master-setup.service';
import { MasterSetupDbService } from './db/master-setup.db.service';
import { UserInfoDbService } from '../holiday/db/user-info.db.service';
import { getModuleHttp } from '../../common/helper/basic-functions';


@Module({
  controllers: [MasterSetupController],
  imports: [
    // AuthModule,
    // PassportModule.register({ session: false }),
    // HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } })
    getModuleHttp()
  ],
  providers: [
    MasterSetupService,
    QueryParserService,
    MasterSetupDbService,
    UserInfoDbService
  ]
})
export class MasterSetupModule { }