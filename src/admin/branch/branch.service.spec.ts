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
    // const branchDbServiceStub = { findAll: tenantId => ({}) };
    const commonFunctionServiceStub = { getListData: arg1 => ({}) };
    const module = await Test.createTestingModule({
      providers: [
        BranchService,
        { provide: BranchDbService, useFactory: mockTaskRepository },
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub }
      ]
    }).compile();
    // service = Test.get(BranchService);
    branchService = await module.get<BranchService>(BranchService);
    branchDbService = await module.get<BranchDbService>(BranchDbService);
    commonFunctionService = await module.get<CommonFunctionService>(CommonFunctionService);
  });
  it('can load instance', () => {
    // service.getList.mockResolvedValue('someValue');
    // let getFind = branchDbService.findAll('tenantid').mockResolvedValue('someValue');
    // commonFunctionService.getListData().mockResolvedValue('someValue');
    // expect(commonFunctionService.getListData).toHaveBeenCalled();
    expect(branchService.getListTest).toBeTruthy();
    expect(branchService.getList).toBeTruthy();
  });

  // describe('getTasks', () => {
  //   it('gets all tasks from the repository', async () => {
  //     const mockList = { tenantId: 'tenanttestid'};

  //     branchDbService.findAll('tenanttestid').mockResolvedValue(mockList);

  //     // expect(commonFunctionService.getListData({tenantId:'tenanttestid'})).not.toHaveBeenCalled();
  //     // const filters = { tenantId: 'idTenant' };
  //     const result = await branchService.getListTest('tenanttestid');
  //     // expect(commonFunctionService.getListData('data')).toHaveBeenCalled();
  //     expect(result).toEqual('someValue');
  //   });
  // });

  // describe('getTaskById', () => {
  //   it('calls taskRepository.findOne() and succesffuly retrieve and return the task', async () => {
  //     const mockFind = 'someValue';
  //     const mockList = { tenantId: 'Testtenant' };
  //     // branchDbService.findAll(mockList.tenantId).mockResolvedValue(mockFind);
  //     // branchService.getList(mockList.tenantId).mockResolvedValue(mockFind);
      
  //     commonFunctionService.getListData(branchDbService.findAll(mockList.tenantId)).mockResolvedValue(mockFind);

  //     const result = await branchService.getList(mockList.tenantId);
  //     expect(result).toEqual(mockFind);

  //     expect(branchDbService.findAll).toHaveBeenCalledWith({
  //       where: {
  //         tenantId: 1
  //       },
  //     });
  //   });

  //   it('throws an error as task is not found', async () => {
  //     const mockFind = 'someValue';
  //     const mockList = { tenantId: 'Testtenant' };
  //     // branchDbService.findAll(mockList.tenantId).mockResolvedValue(null);
  //     commonFunctionService.getListData(branchDbService.findAll(mockList.tenantId)).mockResolvedValue(mockFind);
  //     expect(await branchService.getList(mockList.tenantId)).rejects.toThrow(NotFoundException);
  //   });
  // });
  
});
