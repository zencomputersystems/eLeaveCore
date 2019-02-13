import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats/cats.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BranchModule } from './admin/branch/branch.module';
import { CostcentreModule } from './admin/costcentre/costcentre.module';
import { SectionModule } from './admin/section/section.module';
import { LeavetypeModule } from './admin/leavetype/leavetype.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    BranchModule,
    CostcentreModule,
    SectionModule,
    LeavetypeModule
  ],
  controllers: [AppController, CatsController],
  providers: [AppService, CatsService],
})
export class AppModule {}
