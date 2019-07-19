import { Test } from '@nestjs/testing';
import { BranchDbService } from './db/branch.db.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { BranchService } from './branch.service';
import { NotFoundException } from '@nestjs/common';

const mockTaskRepository = () => ({
  findAll: jest.fn(),
});

describe('BranchService', () => {
  let branchService: BranchService;
  let branchDbService: BranchDbService;
  let commonFunctionService: CommonFunctionService;
  beforeEach(async () => {
    
    const commonFunctionServiceStub = { getListData: arg1 => ({}) };
    const module = await Test.createTestingModule({
      providers: [
        BranchService,
        { provide: BranchDbService, useFactory: mockTaskRepository },
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub }
      ]
    }).compile();
    branchService = await module.get<BranchService>(BranchService);
    branchDbService = await module.get<BranchDbService>(BranchDbService);
    commonFunctionService = await module.get<CommonFunctionService>(CommonFunctionService);
  });
  it('can load instance', () => {
    // expect(branchService.getListTest).toBeTruthy();
    expect(branchService.getList).toBeTruthy();
  });

});
