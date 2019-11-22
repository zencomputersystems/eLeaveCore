import { YearEndClosingService } from '../../../src/admin/year-end-closing/year-end-closing.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { Test } from '@nestjs/testing';

describe('YearEndClosingService', () => {
  let yearEndClosingService: YearEndClosingService;
  let commonFunctionService: CommonFunctionService;
  beforeEach(async () => {

    const yearEndClosingServiceStub = { findAllPendingLeave: arg1 => ({}) };
    const commonFunctionServiceStub = { getListData: arg1 => ({}) };
    const module = await Test.createTestingModule({
      providers: [
        { provide: YearEndClosingService, useValue: yearEndClosingServiceStub },
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub }
      ]
    }).compile();
    yearEndClosingService = await module.get<YearEndClosingService>(YearEndClosingService);
    commonFunctionService = await module.get<CommonFunctionService>(CommonFunctionService);
  });
  it('can load instance', () => {
    expect(yearEndClosingService).toBeTruthy();
  });

});