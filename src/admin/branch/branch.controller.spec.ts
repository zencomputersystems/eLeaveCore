import { Test } from '@nestjs/testing';
import { BranchService } from './branch.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { BranchController } from './branch.controller';
describe('BranchController', () => {
  let pipe: BranchController;
  beforeEach(async () => {
    const branchServiceStub = { getList: arg1 => ({ subscribe: () => ({}) }) };
    const commonFunctionServiceStub = { sendResErrorV3: (err1, res2) => ({}) };
    const module = await Test.createTestingModule({
      providers: [
        BranchController,
        { provide: BranchService, useValue: branchServiceStub },
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub }
      ]
    }).compile();
    // pipe = Test.get(BranchController);
    pipe = await module.get<BranchController>(BranchController);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
