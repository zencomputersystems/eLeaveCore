import { Test } from '@nestjs/testing';
import { LeavetypeService } from '../../../src/admin/leavetype/leavetype.service';
import { CreateLeaveTypeDTO } from '../../../src/admin/leavetype/dto/create-leavetype.dto';
import { UpdateLeaveTypeDTO } from '../../../src/admin/leavetype/dto/update-leavetype.dto';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { LeaveTypeController } from '../../../src/admin/leavetype/leavetype.controller';
describe('LeaveTypeController', () => {
  let pipe: LeaveTypeController;
  beforeEach(async () => {
    const leavetypeServiceStub = {
      create: (arg1, createLeavetypeDTO2) => ({ subscribe: () => ({}) }),
      update: (arg1, updateLeaveTypeDTO2) => ({ subscribe: () => ({}) }),
      findAll: arg1 => ({ subscribe: () => ({}) }),
      findById: (arg1, id2) => ({ subscribe: () => ({}) })
    };
    const createLeaveTypeDtoStub = {};
    const updateLeaveTypeDtoStub = {};
    const commonFunctionServiceStub = {
      sendResErrorV2: (res1, number2, string3) => ({})
    };
    const module = await Test.createTestingModule({
      providers: [
        LeaveTypeController,
        { provide: LeavetypeService, useValue: leavetypeServiceStub },
        { provide: CreateLeaveTypeDTO, useValue: createLeaveTypeDtoStub },
        { provide: UpdateLeaveTypeDTO, useValue: updateLeaveTypeDtoStub },
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub }
      ]
    }).compile();
    // pipe = Test.get(LeaveTypeController);
    pipe = await module.get<LeaveTypeController>(LeaveTypeController);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});