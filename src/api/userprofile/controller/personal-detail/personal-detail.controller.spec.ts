import { Test } from '@nestjs/testing';
import { UserprofileService } from '../../service/userprofile.service';
import { AccessLevelValidateService } from 'src/common/helper/access-level-validate.service';
import { UpdatePersonalDetailDTO } from '../../dto/userprofile-detail/personal-detail/update-personal-detail.dto';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { PersonalDetailController } from './personal-detail.controller';
describe('PersonalDetailController', () => {
  let pipe: PersonalDetailController;
  beforeEach(async () => {
    const userprofileServiceStub = {
      getPersonalDetail: filters1 => ({ subscribe: () => ({}) }),
      updatePersonalDetail: (updatePersonalDetailDTO1, arg2) => ({
        subscribe: () => ({})
      })
    };
    const accessLevelValidateServiceStub = {
      generateFilterWithChecking: (arg1, arg2, arg3, array4) => ({
        pipe: () => ({ subscribe: () => ({}) })
      })
    };
    const updatePersonalDetailDTOStub = {};
    const xMLParserServiceStub = {};
    const module = await Test.createTestingModule({
      providers: [
        PersonalDetailController,
        { provide: UserprofileService, useValue: userprofileServiceStub },
        {
          provide: AccessLevelValidateService,
          useValue: accessLevelValidateServiceStub
        },
        {
          provide: UpdatePersonalDetailDTO,
          useValue: updatePersonalDetailDTOStub
        },
        { provide: XMLParserService, useValue: xMLParserServiceStub }
      ]
    }).compile();
    // pipe = Test.get(PersonalDetailController);
    pipe = await module.get<PersonalDetailController>(PersonalDetailController);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
