import { WorkingHoursService } from '../../../src/admin/working-hours/working-hours.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { Test } from '@nestjs/testing';

describe('WorkingHoursService', () => {
  let workingHoursService: WorkingHoursService;
  let commonFunctionService: CommonFunctionService;
  beforeEach(async () => {

    const workingHoursServiceStub = { findAllPendingLeave: arg1 => ({}) };
    const commonFunctionServiceStub = { getListData: arg1 => ({}) };
    const module = await Test.createTestingModule({
      providers: [
        { provide: WorkingHoursService, useValue: workingHoursServiceStub },
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub }
      ]
    }).compile();
    workingHoursService = await module.get<WorkingHoursService>(WorkingHoursService);
    commonFunctionService = await module.get<CommonFunctionService>(CommonFunctionService);
  });
  it('can load instance', () => {
    expect(workingHoursService).toBeTruthy();
  });

});