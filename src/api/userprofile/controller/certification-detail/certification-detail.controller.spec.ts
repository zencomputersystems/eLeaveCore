import { Test } from '@nestjs/testing';
import { UserprofileService } from '../../service/userprofile.service';
import { AccessLevelValidateService } from 'src/common/helper/access-level-validate.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { CertificationDetailController } from './certification-detail.controller';
describe('CertificationDetailController', () => {
  let pipe: CertificationDetailController;
  beforeEach(async () => {
    const userprofileServiceStub = { getCertificationDetail: filter1 => ({}) };
    const accessLevelValidateServiceStub = {
      generateFilterWithChecking: (arg1, arg2, arg3, array4) => ({
        pipe: () => ({ subscribe: () => ({}) })
      })
    };
    const commonFunctionServiceStub = { sendResErrorV3: (err1, res2) => ({}) };
    const module = await Test.createTestingModule({
      providers: [
        CertificationDetailController,
        { provide: UserprofileService, useValue: userprofileServiceStub },
        {
          provide: AccessLevelValidateService,
          useValue: accessLevelValidateServiceStub
        },
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub }
      ]
    }).compile();
    // pipe = Test.get(CertificationDetailController);
    pipe = await module.get<CertificationDetailController>(CertificationDetailController);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
