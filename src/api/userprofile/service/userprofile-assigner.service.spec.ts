import 'reflect-metadata';
import { UserprofileAssignerService } from './userprofile-assigner.service';
import { Test } from '@nestjs/testing';

describe('UserprofileAssignerService', () => {
  let userprofileAssignerService: UserprofileAssignerService;
  beforeEach(async () => {

    const userprofileAssignerServiceStub = {};

    const module = await Test.createTestingModule({
      providers: [
        { provide: UserprofileAssignerService, useValue: userprofileAssignerServiceStub }
      ]
    }).compile();
    userprofileAssignerService = await module.get<UserprofileAssignerService>(UserprofileAssignerService);
  });
  it('can load instance', () => {
    expect(userprofileAssignerService).toBeTruthy();
  });

});