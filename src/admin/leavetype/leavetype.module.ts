import { Module } from '@nestjs/common';
import { LeavetypeController } from './leavetype.controller';
import { LeavetypeService } from './leavetype.service';

@Module({
  controllers: [LeavetypeController],
  providers: [LeavetypeService]
})
export class LeavetypeModule {}
