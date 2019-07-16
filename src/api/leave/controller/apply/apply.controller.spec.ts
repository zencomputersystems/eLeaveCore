import { Test } from '@nestjs/testing';
import { ApplyLeaveService } from '../../service/apply-leave.service';
import { ApplyLeaveDTO } from '../../dto/apply-leave.dto';
import { AccessLevelValidateService } from 'src/common/helper/access-level-validate.service';
import { ApplyController } from './apply.controller';
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
    const module = await Test.createTestingModule({
      providers: [
        ApplyController,
        { provide: ApplyLeaveService, useValue: applyLeaveServiceStub },
        { provide: ApplyLeaveDTO, useValue: applyLeaveDTOStub },
        {
          provide: AccessLevelValidateService,
          useValue: accessLevelValidateServiceStub
        }
      ]
    }).compile();
    pipe = await module.get<ApplyController>(ApplyController);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
