import { Test } from '@nestjs/testing';
import { DesignationService } from './designation.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { DesignationController } from './designation.controller';
describe('DesignationController', () => {
  let pipe: DesignationController;
  beforeEach(async () => {
    const designationServiceStub = {
      getList: arg1 => ({ subscribe: () => ({}) })
    };
    const commonFunctionServiceStub = { sendResErrorV3: (err1, res2) => ({}) };
    const module = await Test.createTestingModule({
      providers: [
        DesignationController,
        { provide: DesignationService, useValue: designationServiceStub },
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub }
      ]
    }).compile();
    pipe = await module.get<DesignationController>(DesignationController);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
