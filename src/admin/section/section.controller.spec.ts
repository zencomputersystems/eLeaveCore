import { Test } from '@nestjs/testing';
import { SectionService } from './section.service';
import { CreateSectionDto } from './dto/create-section.dto';
import { UpdateSectionDto } from './dto/update-section.dto';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { SectionController } from './section.controller';

describe('SectionController', () => {
  let sectionController: SectionController;
  let sectionService: SectionService;
  beforeEach(async () => {
    const sectionServiceStub = {
      create: (arg1, arg2) => ({ subscribe: () => ({}) }),
      update: (arg1, updateSectionDTO2) => ({ subscribe: () => ({}) }),
      findAll: arg1 => ({ subscribe: () => ({}) }),
      findById: (arg1, id2) => ({ subscribe: () => ({}) })
    };
    const createSectionDtoStub = { name: {} };
    const updateSectionDtoStub = {};
    const commonFunctionServiceStub = {
      sendResErrorV2: (res1, number2, string3) => ({})
    };
    const module = await Test.createTestingModule({
      providers: [
        SectionController,
        { provide: SectionService, useValue: sectionServiceStub },
        { provide: CreateSectionDto, useValue: createSectionDtoStub },
        { provide: UpdateSectionDto, useValue: updateSectionDtoStub },
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub }
      ]
    }).compile();
    
    sectionController = await module.get<SectionController>(SectionController);
    sectionService = await module.get<SectionService>(SectionService);
  });
  it('can load instance', () => {
    expect(sectionController).toBeTruthy();
  });

  describe('findAll', () => {
    it('findAll section from the database', async () => {
      const sectionServiceStub: SectionService = sectionService;
      spyOn(sectionServiceStub, 'findAll').and.callThrough();

      const mockUser = {
        "user":{
          "TENANT_ID":"tenantguidtest"
        }
      }

      expect(sectionServiceStub.findAll).not.toHaveBeenCalled();
      sectionController.findAllSection(mockUser,'data');
      expect(sectionServiceStub.findAll).toHaveBeenCalledTimes(1);
    });
  });

});
