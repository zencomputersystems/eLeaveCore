import { Test } from '@nestjs/testing';
import { DesignationDbService } from './db/designation.db.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { DesignationService } from './designation.service';
describe('DesignationService', () => {
  let service: DesignationService;
  beforeEach(async () => {
    const designationDbServiceStub = { findAll: tenantId1 => ({}) };
    const commonFunctionServiceStub = { getListData: arg1 => ({}) };
    const module = await Test.createTestingModule({
      providers: [
        DesignationService,
        { provide: DesignationDbService, useValue: designationDbServiceStub },
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub }
      ]
    }).compile();
    service = await module.get<DesignationService>(DesignationService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
