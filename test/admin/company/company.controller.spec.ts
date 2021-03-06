import { Test } from '@nestjs/testing';
import { CompanyController } from '../../../src/admin/company/company.controller';
import { CompanyService } from '../../../src/admin/company/company.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { HttpService } from '@nestjs/common';
import { QueryParserService } from 'src/common/helper/query-parser.service';
import { GeneralLeavePolicyService } from '../../../src/admin/general-leave-policy/general-leave-policy.service';
describe('CompanyController', () => {
  let pipe: CompanyController;
  beforeEach(async () => {
    const httpServiceStub = {
      get: url1 => ({})
    };
    const queryParserServiceStub = {
      generateDbQueryV2: (arg1, fields2, filters3, array4) => ({})
    };
    const companyServiceStub = {

    };
    const module = await Test.createTestingModule({
      providers: [
        CompanyController,
        {
          provide: CompanyService,
          useValue: companyServiceStub
        },
        {
          provide: HttpService,
          useValue: httpServiceStub
        },
        {
          provide: QueryParserService,
          useValue: queryParserServiceStub
        },
        CommonFunctionService,
        GeneralLeavePolicyService
      ]
    }).compile();
    pipe = await module.get<CompanyController>(CompanyController);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
