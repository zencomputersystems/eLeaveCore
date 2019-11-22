import { Test } from '@nestjs/testing';
import { UserImportService } from '../../../src/api/userimport/user-import.service';
import { UserImportController } from '../../../src/api/userimport/user-import.controller';
describe('UserImportController', () => {
  let pipe: UserImportController;
  beforeEach(async () => {
    const userImportServiceStub = {
      processImportData: (arg1, userInviteDto2) => ({ subscribe: () => ({}) })
    };
    const module = await Test.createTestingModule({
      providers: [
        UserImportController,
        { provide: UserImportService, useValue: userImportServiceStub }
      ]
    }).compile();
    // pipe = Test.get(UserImportController);
    pipe = await module.get<UserImportController>(UserImportController);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
