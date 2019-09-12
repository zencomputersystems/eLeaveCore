import { WorkingHoursDbService } from './working-hours.db.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { Test } from '@nestjs/testing';

describe('WorkingHoursDbService', () => {
  let workingHoursDbService: WorkingHoursDbService;
  let commonFunctionService: CommonFunctionService;
  beforeEach(async () => {

    const workingHoursDbServiceStub = { findAllPendingLeave: arg1 => ({}) };
    const commonFunctionServiceStub = { getListData: arg1 => ({}) };
    const module = await Test.createTestingModule({
      providers: [
        { provide: WorkingHoursDbService, useValue: workingHoursDbServiceStub },
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub }
      ]
    }).compile();
    workingHoursDbService = await module.get<WorkingHoursDbService>(WorkingHoursDbService);
    commonFunctionService = await module.get<CommonFunctionService>(CommonFunctionService);
  });
  it('can load instance', () => {
    expect(workingHoursDbService).toBeTruthy();
  });

});