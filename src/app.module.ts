import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BranchModule } from './admin/branch/branch.module';
import { CostcentreModule } from './admin/costcentre/costcentre.module';
import { SectionModule } from './admin/section/section.module';
import { LeavetypeModule } from './admin/leavetype/leavetype.module';
import { LeavetypeEntitlementModule } from './admin/leavetype-entitlement/leavetype-entitlement.module';
import { UserModule } from './admin/user/user.module';
import { UserInfoModule } from './admin/user-info/user-info.module';
import { HandlebarsAdapter, MailerModule, PugAdapter } from '@nest-modules/mailer';
import { DepartmentModule } from './admin/department/department.module';
import { CompanyModule } from './admin/company/company.module';
import { DesignationModule } from './admin/designation/designation.module';
import { InvitationModule } from './api/invitation/invitation.module';
import { UserprofileModule } from './api/userprofile/userprofile.module';
import { UserImportModule } from './api/userimport/user-import.module';
import { LeaveModule } from './api/leave/leave.module';
import { HolidayModule } from './admin/holiday/holiday.module';
import { DashboardModule } from './api/dashboard/dashboard.module';
import { RoleModule } from './admin/role/role.module';
import { NotificationModule } from './admin/notification/notification.module';
import { GeneralLeavePolicyModule } from './admin/general-leave-policy/general-leave-policy.module';
import { ApprovalOverrideModule } from './admin/approval-override/approval-override.module';
import { LeaveAdjustmentModule } from './admin/leave-adjustment/leave-adjustment.module';
import { YearEndClosingModule } from './admin/year-end-closing/year-end-closing.module';
import { MasterSetupModule } from './admin/master-setup/master-setup.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    BranchModule,
    CostcentreModule,
    SectionModule,
    LeavetypeModule,
    LeavetypeEntitlementModule,
    UserInfoModule,
    UserImportModule,
    MailerModule.forRoot({
      transport: {
        service: 'Gmail',
        auth: {
          user: 'wantan.wonderland.2018@gmail.com',
          pass: 'wantan123'
        }
      },
      defaults: {
        from: '"Leave System" <wantan.wonderland.2018@gmail.com',
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
    DepartmentModule,
    CompanyModule,
    DesignationModule,
    UserprofileModule,
    LeaveModule,
    HolidayModule,
    DashboardModule,
    RoleModule,
    NotificationModule,
    GeneralLeavePolicyModule,
    ApprovalOverrideModule,
    LeaveAdjustmentModule,
    YearEndClosingModule,
    MasterSetupModule
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {
}