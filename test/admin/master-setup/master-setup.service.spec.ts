import { MasterSetupService } from '../../../src/admin/master-setup/master-setup.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { Test } from '@nestjs/testing';

describe('MasterSetupService', () => {
  let masterSetupService: MasterSetupService;
  let commonFunctionService: CommonFunctionService;
  beforeEach(async () => {

    const masterSetupServiceStub = { findAllPendingLeave: arg1 => ({}) };
    const commonFunctionServiceStub = { getListData: arg1 => ({}) };
    const module = await Test.createTestingModule({
      providers: [
        { provide: MasterSetupService, useValue: masterSetupServiceStub },
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub }
      ]
    }).compile();
    masterSetupService = await module.get<MasterSetupService>(MasterSetupService);
    commonFunctionService = await module.get<CommonFunctionService>(CommonFunctionService);
  });
  it('can load instance', () => {
    expect(masterSetupService).toBeTruthy();
  });

});