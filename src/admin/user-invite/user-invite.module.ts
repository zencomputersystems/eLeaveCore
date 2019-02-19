import { Module } from '@nestjs/common';
import { UserInviteController } from './user-invite.controller';
import { UserInviteService } from './user-invite.service';

@Module({
  controllers: [UserInviteController],
  providers: [UserInviteService]
})
export class UserInviteModule {}
