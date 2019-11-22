import { Test } from '@nestjs/testing';
import { ApplyLeaveService } from '../../../src/api/leave/service/apply-leave.service';
import { ApplyLeaveDTO } from '../../../src/api/leave/dto/apply-leave.dto';
import { AccessLevelValidateService } from 'src/common/helper/access-level-validate.service';
import { ApplyController } from '../../../src/api/leave/controller/apply/apply.controller';
import { CommonFunctionService } from '../../../src/common/helper/common-function.services';
import { HttpService } from '@nestjs/common';
import { QueryParserService } from '../../../src/common/helper/query-parser.service';
import { XMLParserService } from '../../../src/common/helper/xml-parser.service';
describe('ApplyController', () => {
  let pipe: ApplyController;
  beforeEach(async () => {
    const applyLeaveServiceStub = {
      processLeave: (applyLeaveDTO1, arg2) => ({ subscribe: () => ({}) }),
      processLeaveOnBehalf: (applyLeaveDTO1, arg2, id3, filter4) => ({})
    };
    const applyLeaveDTOStub = {};
    const accessLevelValidateServiceStub = {
      generateFilterWithChecking: (arg1, arg2, arg3, array4) => ({
        pipe: () => ({ subscribe: () => ({}) })
      })
    };
    const httpServiceStub = { get: url1 => ({}) };
    const module = await Test.createTestingModule({
      providers: [
        ApplyController,
        { provide: ApplyLeaveService, useValue: applyLeaveServiceStub },
        { provide: ApplyLeaveDTO, useValue: applyLeaveDTOStub },
        {
          provide: AccessLevelValidateService,
          useValue: accessLevelValidateServiceStub
        },
        CommonFunctionService,
        { provide: HttpService, useValue: httpServiceStub },
        QueryParserService,
        XMLParserService
      ]
    }).compile();
    pipe = await module.get<ApplyController>(ApplyController);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
