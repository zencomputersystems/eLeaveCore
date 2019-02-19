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
    UserImportModule
  ],
  controllers: [AppController],
  providers: [AppService, UserImportService],
})
export class AppModule {}
