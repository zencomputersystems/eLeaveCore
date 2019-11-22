import { UserProfileStatusService } from '../../../../src/api/userprofile/service/userprofile-status.service';
import { Test } from '@nestjs/testing';

describe('UserProfileStatusService', () => {
  let userProfileStatusService: UserProfileStatusService;
  beforeEach(async () => {

    const userProfileStatusServiceStub = {};

    const module = await Test.createTestingModule({
      providers: [
        { provide: UserProfileStatusService, useValue: userProfileStatusServiceStub }
      ]
    }).compile();
    userProfileStatusService = await module.get<UserProfileStatusService>(UserProfileStatusService);
  });
  it('can load instance', () => {
    expect(userProfileStatusService).toBeTruthy();
  });

});