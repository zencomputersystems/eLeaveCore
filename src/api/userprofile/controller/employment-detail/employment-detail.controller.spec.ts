import { Test } from '@nestjs/testing';
import { UserprofileService } from '../../service/userprofile.service';
import { AccessLevelValidateService } from 'src/common/helper/access-level-validate.service';
import { UpdateEmploymentDetailDTO } from '../../dto/userprofile-detail/employment-detail/update-employment-detail.dto';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { EmploymentDetailController } from './employment-detail.controller';
describe('EmploymentDetailController', () => {
  let pipe: EmploymentDetailController;
  beforeEach(async () => {
    const userprofileServiceStub = {
      getEmploymentDetail: filter1 => ({}),
      updateEmploymentDetail: (updateEmploymentDetailDTO1, arg2) => ({
        subscribe: () => ({})
      })
    };
    const accessLevelValidateServiceStub = {
      generateFilterWithChecking: (arg1, arg2, arg3, array4) => ({
        pipe: () => ({ subscribe: () => ({}) })
      })
    };
    const updateEmploymentDetailDTOStub = {};
    const commonFunctionServiceStub = { sendResErrorV3: (err1, res2) => ({}) };
    const module = await Test.createTestingModule({
      providers: [
        EmploymentDetailController,
        { provide: UserprofileService, useValue: userprofileServiceStub },
        {
          provide: AccessLevelValidateService,
          useValue: accessLevelValidateServiceStub
        },
        {
          provide: UpdateEmploymentDetailDTO,
          useValue: updateEmploymentDetailDTOStub
        },
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub }
      ]
    }).compile();
    // pipe = Test.get(EmploymentDetailController);
    pipe = await module.get<EmploymentDetailController>(EmploymentDetailController);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
