import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsController } from './cats/cats.controller';
import { CatsService } from './cats/cats/cats.service';
import { CostcentreController } from './admin/costcentre/costcentre.controller';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BranchModule } from './admin/branch/branch.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    BranchModule
  ],
  controllers: [AppController, CatsController,CostcentreController],
  providers: [AppService, CatsService],
})
export class AppModule {}
