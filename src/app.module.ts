import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BranchModule } from './admin/branch/branch.module';
import { CostcentreModule } from './admin/costcentre/costcentre.module';
import { SectionModule } from './admin/section/section.module';
import { LeavetypeModule } from './admin/leavetype/leavetype.module';
import { LeavetypeEntitlementModule } from './admin/leavetype-entitlement/leavetype-entitlement.module';
import { UserModule } from './admin/user/user.module';
import { UserInviteModule } from './admin/user-invite/user-invite.module';
import { UserInfoModule } from './admin/user-info/user-info.module';
import { UserImportService } from './admin/user-import/user-import.service';
import { UserImportModule } from './admin/user-import/user-import.module';
import { HandlebarsAdapter, MailerModule, PugAdapter } from '@nest-modules/mailer';
import { InvitationModule } from './employee/invitation/invitation.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    BranchModule,
    CostcentreModule,
    SectionModule,
    LeavetypeModule,
    LeavetypeEntitlementModule,
    UserInviteModule,
    UserInfoModule,
    UserImportModule,
    MailerModule.forRoot({
      transport: {
        service:'Gmail',
        auth: {
          user: 'wantan.wonderland.2018@gmail.com',
          pass: 'wantan123'
        }
      },
      defaults: {
        from:'"Leave System" <wantan.wonderland.2018@gmail.com',
      },
      template: {
        dir: './src/common/email-templates',
        adapter: new HandlebarsAdapter(), // or new PugAdapter()
        options: {
          debug: 'true',
          doctype: 'html',
        },
      },
    }),
    InvitationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
