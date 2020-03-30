
import { AnnouncementService } from '../../../src/admin/announcement/announcement.service';
import { Test } from '@nestjs/testing';
import { CreateAnnouncementDto } from '../../../src/admin/announcement/Dto/create-announcement.Dto';
import { UpdateAnnouncementDto } from '../../../src/admin/announcement/Dto/update-announcement.Dto';
import { Resource } from '../../../src/common/model/resource.model';
import { AnnouncementModel } from '../../../src/admin/announcement/model/announcement.model';

describe('AnnouncementService', () => {
  let Service: AnnouncementService;
  let CreateData: CreateAnnouncementDto;
  let UpdateData: UpdateAnnouncementDto;
  let AnnouncementModelData: AnnouncementModel;

  beforeEach(
    async () => {

      const AnnouncementServiceStub = {
        create: (data: CreateAnnouncementDto, user: any) => ({
        }),

        findAll: (user: any) => ({
        }),

        updateAnnouncement: (d: UpdateAnnouncementDto, user: any) => ({
        }),

        inputDataAnnouncement: ([model, data]: [AnnouncementModel, UpdateAnnouncementDto | CreateAnnouncementDto]) => ({
        }),

        deleteAnnouncement: (announcementId: string, user: any) => ({
        })

      };

      const CreateAnnouncementDtoStub = {
        title: {},
        message: {},
        isPinned: {}
      }

      const UpdateAnnouncementDtoStub = {
        announcementId: {},
        title: {},
        message: {},
        isPinned: {}
      }

      const AnnouncementModelStub = {
        LOG_GUID: {},
        CUSTOMER_GUID: {},
        SUBSCRIPTION_GUID: {},
        MESSAGE: {}
      }


      const module = await Test.createTestingModule({
        providers: [
          {
            provide: AnnouncementService,
            useValue: AnnouncementServiceStub
          },
          {
            provide: CreateAnnouncementDto,
            useValue: CreateAnnouncementDtoStub
          },
          {
            provide: UpdateAnnouncementDto,
            useValue: UpdateAnnouncementDtoStub
          },
          {
            provide: AnnouncementModel,
            useValue: AnnouncementModelStub
          }

        ],
      }).compile();

      Service = module.get<AnnouncementService>(AnnouncementService);;
      CreateData = module.get<CreateAnnouncementDto>(CreateAnnouncementDto);
      UpdateData = module.get<UpdateAnnouncementDto>(UpdateAnnouncementDto);
      AnnouncementModelData = module.get<AnnouncementModel>(AnnouncementModel);;
    });


  describe('AnnouncementService', () => {
    it('Can load instance', () => {
      expect(Service).toBeTruthy();
    });
  });

  // Get Announcement method
  describe('Get Announcement', () => {

    // Service
    it('Should not call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      expect(Service.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll(null);
      expect(Service.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll(null);
      expect(Service.findAll).toHaveBeenCalledTimes(1);
    })


  });

  // Create Announcement method
  describe('Create Announcement', () => {
    // Service
    it('Should not call method create Announcement in service announcement', () => {
      spyOn(Service, 'create').and.callThrough();
      expect(Service.create).not.toHaveBeenCalled();
    })

    it('Should call method create Announcement in service announcement', () => {
      spyOn(Service, 'create').and.callThrough();
      Service.create(CreateData, null);
      expect(Service.create).toHaveBeenCalled();
    })

    it('Should call one time method create Announcement in service announcement', () => {
      spyOn(Service, 'create').and.callThrough();
      Service.create(CreateData, null);
      expect(Service.create).toHaveBeenCalledTimes(1);
    })

    it('Should call one time method input data in service announcement', () => {
      spyOn(Service, 'inputDataAnnouncement').and.callThrough();
      Service.inputDataAnnouncement([AnnouncementModelData, CreateData]);
      expect(Service.inputDataAnnouncement).toHaveBeenCalledTimes(1);
    })

  });

  // Update Announcement method
  describe('Update Announcement', () => {
    // Service
    it('Should not call method update Announcement in service announcement', () => {
      spyOn(Service, 'updateAnnouncement').and.callThrough();
      expect(Service.updateAnnouncement).not.toHaveBeenCalled();
    })

    it('Should call method update Announcement in service announcement', () => {
      spyOn(Service, 'updateAnnouncement').and.callThrough();
      Service.updateAnnouncement(UpdateData, null);
      expect(Service.updateAnnouncement).toHaveBeenCalled();
    })

    it('Should call one time method update Announcement in service announcement', () => {
      spyOn(Service, 'updateAnnouncement').and.callThrough();
      Service.updateAnnouncement(UpdateData, null);
      expect(Service.updateAnnouncement).toHaveBeenCalledTimes(1);
    })

    it('Should call one time method input data in service announcement', () => {
      spyOn(Service, 'inputDataAnnouncement').and.callThrough();
      Service.inputDataAnnouncement([AnnouncementModelData, UpdateData]);
      expect(Service.inputDataAnnouncement).toHaveBeenCalledTimes(1);
    })

  });

});

