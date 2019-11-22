import { YearEndClosingController } from '../../../src/admin/year-end-closing/year-end-closing.controller';
import { Test } from '@nestjs/testing';
import { YearEndClosingService } from '../../../src/admin/year-end-closing/year-end-closing.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';

describe('YearEndClosingController', () => {
  let pipe: YearEndClosingController;
  beforeEach(async () => {
    const yearEndClosingServiceStub = { getList: arg1 => ({ subscribe: () => ({}) }) };
    const commonFunctionServiceStub = { sendResErrorV3: (err1, res2) => ({}) };
    const yearEndClosingControllerStub = {};
    const module = await Test.createTestingModule({
      providers: [
        { provide: YearEndClosingController, useValue: yearEndClosingControllerStub },
        { provide: YearEndClosingService, useValue: yearEndClosingServiceStub },
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub }
      ]
    }).compile();
    pipe = await module.get<YearEndClosingController>(YearEndClosingController);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});