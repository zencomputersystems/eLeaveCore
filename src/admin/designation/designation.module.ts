import { Module } from '@nestjs/common';
import { DesignationService } from './designation.service';
import { DesignationController } from './designation.controller';

@Module({
  providers: [DesignationService],
  controllers: [DesignationController]
})
export class DesignationModule {}
