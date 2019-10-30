import { ForgotPasswordService } from './forgot-password.service';
import { ForgotPasswordController } from './forgot-password.controller';
// import { AuthModule } from 'src/auth/auth.module';
// import { PassportModule } from '@nestjs/passport';
import { HttpModule, Module } from '@nestjs/common';
import { DreamFactory } from 'src/config/dreamfactory';
import { EmailNodemailerService } from 'src/common/helper/email-nodemailer.service';
import { getModuleHttp } from '../../common/helper/basic-functions';

@Module({
  imports: [
    // AuthModule,
    // PassportModule.register({ session: false }),
    // HttpModule.register({ headers: { 'Content-Type': 'application/json', 'X-Dreamfactory-API-Key': DreamFactory.df_key } })
    getModuleHttp()
  ],
  providers: [
    ForgotPasswordService,
    EmailNodemailerService
  ],
  controllers: [ForgotPasswordController]
})
export class ForgotPasswordModule { }