import { WorkingHoursController } from '../../../src/admin/working-hours/working-hours.controller';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { WorkingHoursService } from '../../../src/admin/working-hours/working-hours.service';
import { Test } from '@nestjs/testing';

describe('WorkingHoursController', () => {
  let pipe: WorkingHoursController;
  beforeEach(async () => {
    const workingHoursServiceStub = { getList: arg1 => ({ subscribe: () => ({}) }) };
    const commonFunctionServiceStub = { sendResErrorV3: (err1, res2) => ({}) };
    const workingHoursControllerStub = {};
    const module = await Test.createTestingModule({
      providers: [
        { provide: WorkingHoursController, useValue: workingHoursControllerStub },
        { provide: WorkingHoursService, useValue: workingHoursServiceStub },
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub }
      ]
    }).compile();
    pipe = await module.get<WorkingHoursController>(WorkingHoursController);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});