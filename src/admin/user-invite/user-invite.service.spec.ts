import { Test, TestingModule } from '@nestjs/testing';
import { UserInviteService } from './user-invite.service';

describe('UserInviteService', () => {
  let service: UserInviteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserInviteService],
    }).compile();

    service = module.get<UserInviteService>(UserInviteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
