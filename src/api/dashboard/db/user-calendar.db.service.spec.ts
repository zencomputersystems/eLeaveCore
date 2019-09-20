import { UserCalendarDbService } from './user-calendar.db.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { Test } from '@nestjs/testing';

describe('UserCalendarDbService', () => {
  let userCalendarDbService: UserCalendarDbService;
  let commonFunctionService: CommonFunctionService;
  beforeEach(async () => {

    const userCalendarDbServiceStub = { findAllPendingLeave: arg1 => ({}) };
    const commonFunctionServiceStub = { getListData: arg1 => ({}) };
    const module = await Test.createTestingModule({
      providers: [
        { provide: UserCalendarDbService, useValue: userCalendarDbServiceStub },
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub }
      ]
    }).compile();
    userCalendarDbService = await module.get<UserCalendarDbService>(UserCalendarDbService);
    commonFunctionService = await module.get<CommonFunctionService>(CommonFunctionService);
  });
  it('can load instance', () => {
    expect(userCalendarDbService).toBeTruthy();
  });

});