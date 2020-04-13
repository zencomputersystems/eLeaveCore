import { ForgotPasswordService } from './forgot-password.service';
import { ForgotPasswordController } from './forgot-password.controller';
// import { AuthModule } from 'src/auth/auth.module';
// import { PassportModule } from '@nestjs/passport';
import { HttpModule, Module } from '@nestjs/common';
import { DreamFactory } from 'src/config/dreamfactory';
import { EmailNodemailerService } from 'src/common/helper/email-nodemailer.service';
import { getModuleHttp } from '../../common/helper/basic-functions';
import { ProfileDefaultDbService } from 'src/admin/profile-default/profile-default.db.service';
import { UserService } from 'src/admin/user/user.service';
import { QueryParserService } from 'src/common/helper/query-parser.service';

@Module({
  imports: [
    // AuthModule,
    // PassportModule.register({ session: false }),
    // HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } })
    getModuleHttp()
  ],
  providers: [
    // ForgotPasswordService,
    // EmailNodemailerService,
    // ProfileDefaultDbService,
    UserService,
    QueryParserService
  ],
  controllers: [ForgotPasswordController]
})
export class ForgotPasswordModule { }