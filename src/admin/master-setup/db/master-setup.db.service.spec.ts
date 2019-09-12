import { MasterSetupDbService } from './master-setup.db.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { Test } from '@nestjs/testing';

describe('MasterSetupDbService', () => {
  let masterSetupDbService: MasterSetupDbService;
  let commonFunctionService: CommonFunctionService;
  beforeEach(async () => {

    const masterSetupDbServiceStub = { findAllPendingLeave: arg1 => ({}) };
    const commonFunctionServiceStub = { getListData: arg1 => ({}) };
    const module = await Test.createTestingModule({
      providers: [
        { provide: MasterSetupDbService, useValue: masterSetupDbServiceStub },
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub }
      ]
    }).compile();
    masterSetupDbService = await module.get<MasterSetupDbService>(MasterSetupDbService);
    commonFunctionService = await module.get<CommonFunctionService>(CommonFunctionService);
  });
  it('can load instance', () => {
    expect(masterSetupDbService).toBeTruthy();
  });

});