import { Test } from '@nestjs/testing';
import { MasterSetupController } from '../../../src/admin/master-setup/master-setup.controller';
import { MasterSetupService } from '../../../src/admin/master-setup/master-setup.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';

describe('MasterSetupController', () => {
  let pipe: MasterSetupController;
  beforeEach(async () => {
    const masterSetupServiceStub = { getList: arg1 => ({ subscribe: () => ({}) }) };
    const commonFunctionServiceStub = { sendResErrorV3: (err1, res2) => ({}) };
    const masterSetupControllerStub = {};
    const module = await Test.createTestingModule({
      providers: [
        { provide: MasterSetupController, useValue: masterSetupControllerStub },
        { provide: MasterSetupService, useValue: masterSetupServiceStub },
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub }
      ]
    }).compile();
    pipe = await module.get<MasterSetupController>(MasterSetupController);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});