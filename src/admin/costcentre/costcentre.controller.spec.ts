import { Test } from '@nestjs/testing';
import { CreateCostCentreDto } from './dto/create-costcentre.dto';
import { UpdateCostCentreDto } from './dto/update-costcentre.dto';
import { CostcentreService } from './costcentre.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { CostcentreController } from './costcentre.controller';
describe('CostcentreController', () => {
  let pipe: CostcentreController;
  beforeEach(async () => {
    const createCostCentreDtoStub = { name: {} };
    const updateCostCentreDtoStub = {};
    const costcentreServiceStub = {
      create: (arg1, arg2) => ({ subscribe: () => ({}) }),
      update: (arg1, updateBranchDTO2) => ({ subscribe: () => ({}) }),
      findAll: arg1 => ({ subscribe: () => ({}) }),
      findById: (arg1, id2) => ({ subscribe: () => ({}) })
    };
    const commonFunctionServiceStub = {
      sendResErrorV2: (res1, number2, string3) => ({})
    };
    const module = await Test.createTestingModule({
      providers: [
        CostcentreController,
        { provide: CreateCostCentreDto, useValue: createCostCentreDtoStub },
        { provide: UpdateCostCentreDto, useValue: updateCostCentreDtoStub },
        { provide: CostcentreService, useValue: costcentreServiceStub },
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub }
      ]
    }).compile();
    pipe = await module.get<CostcentreController>(CostcentreController);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
