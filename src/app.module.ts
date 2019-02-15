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

@Module({
  imports: [
    AuthModule,
    UserModule,
    BranchModule,
    CostcentreModule,
    SectionModule,
    LeavetypeModule,
    LeavetypeEntitlementModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
