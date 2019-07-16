import { Test } from '@nestjs/testing';
import { DepartmentService } from './department.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { DepartmentController } from './department.controller';
describe('DepartmentController', () => {
  let pipe: DepartmentController;
  beforeEach(async() => {
    const departmentServiceStub = {
      getList: arg1 => ({ subscribe: () => ({}) })
    };
    const commonFunctionServiceStub = { sendResErrorV3: (err1, res2) => ({}) };
    const module = await Test.createTestingModule({
      providers: [
        DepartmentController,
        { provide: DepartmentService, useValue: departmentServiceStub },
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub }
      ]
    }).compile();
    pipe = await module.get<DepartmentController>(DepartmentController);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
