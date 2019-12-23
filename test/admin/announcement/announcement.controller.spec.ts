
import { AnnouncementController } from '../../../src/admin/announcement/announcement.controller';
import { AnnouncementService } from '../../../src/admin/announcement/announcement.service';
import { Test } from '@nestjs/testing';
import { CreateAnnouncementDto } from '../../../src/admin/announcement/Dto/create-announcement.Dto';
import { UpdateAnnouncementDto } from '../../../src/admin/announcement/Dto/update-announcement.Dto';
import { AnnouncementModel } from '../../../src/admin/announcement/model/announcement.model';

describe('AnnouncementController', () => {
  let Controller: AnnouncementController;
  let Service: AnnouncementService;
  let CreateData: CreateAnnouncementDto;
  let UpdateData: UpdateAnnouncementDto;
  let AnnouncemnetModelData: AnnouncementModel;

  beforeEach(
    async () => {

      const AnnouncementControllerStub = {
        create: (AnnouncementData: CreateAnnouncementDto, req, res: Response) => ({
          subscribe: () => ({
          })
        }),

        findAll: (res: Response) => ({
          subscribe: () => ({
          })
        }),

        updateAnnouncement: (AnnouncementData: UpdateAnnouncementDto, req, res: Response) => ({
          subscribe: () => ({
          })
        }),

        deleteAnnouncement: (id: string, req, res: Response) => ({
          subscribe: () => ({
          })
        })

      }

      const AnnouncementServiceStub = {
        findAll: () => ({}),

        create: (AnnouncementData: CreateAnnouncementDto, user: any) => ({
        }),

        updateAnnouncement: (d: UpdateAnnouncementDto, user: any) => ({
        }),

        deleteAnnouncement: (announcementId: string, user: any) => ({

        }),

        inputDataAnnouncement: ([model, data]: [AnnouncementModel, UpdateAnnouncementDto | CreateAnnouncementDto]) => ({})
      };

      const createAnnouncementDtoStub = {
        customerId: {},
        subscriptionId: {},
        message: {}
      }

      const UpdateAnnouncementDtoStub = {
        logId: {},
        customerId: {},
        subscriptionId: {},
        message: {}
      }

      const AnnouncementModelStub = {
        ANNOUNCEMENT_GUID: {},
        TITLE: {},
        MESSAGE: {},
        IS_PINNED: {},
        CREATION_USER_GUID: {},
        CREATION_TS: {},
        UPDATE_USER_GUID: {},
        UPDATE_TS: {},
        DELETED_AT: {}
      }

      const module = await Test.createTestingModule({
        providers: [
          {
            provide: AnnouncementController,
            useValue: AnnouncementControllerStub
          },
          {
            provide: AnnouncementService,
            useValue: AnnouncementServiceStub
          },
          {
            provide: CreateAnnouncementDto,
            useValue: createAnnouncementDtoStub
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

      Controller = module.get<AnnouncementController>(AnnouncementController);
      Service = module.get<AnnouncementService>(AnnouncementService);
      CreateData = module.get<CreateAnnouncementDto>(CreateAnnouncementDto);
      UpdateData = module.get<UpdateAnnouncementDto>(UpdateAnnouncementDto);
      AnnouncemnetModelData = module.get<AnnouncementModel>(AnnouncementModel);
    });

  describe('AnnouncementController', () => {
    it('Can load instance', () => {
      expect(Controller).toBeTruthy();
    });
  });

  // Get Announcement method
  describe('Get Announcement', () => {
    // Controller
    it('Should not call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      expect(Controller.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalledTimes(1);
    })

    // Service
    it('Should not call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      expect(Service.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalledTimes(1);
    })

  });

  // Create Announcement method
  describe('Create Announcement', () => {
    // Controller
    it('Should not call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      expect(Controller.create).not.toHaveBeenCalled();
    })

    it('Should call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalled();
    })

    it('Should call one time method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalledTimes(1);
    })

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

  });

  // Update Announcement method
  describe('Update Announcement', () => {
    // Controller
    it('Should not call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      expect(Controller.updateAnnouncement).not.toHaveBeenCalled();
    })

    it('Should call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalled();
    })

    it('Should call one time method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalledTimes(1);
    })

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

  });













  // Get Announcement method
  describe('Get Announcement', () => {
    // Controller
    it('Should not call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      expect(Controller.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalledTimes(1);
    })

    // Service
    it('Should not call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      expect(Service.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalledTimes(1);
    })

  });

  // Create Announcement method
  describe('Create Announcement', () => {
    // Controller
    it('Should not call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      expect(Controller.create).not.toHaveBeenCalled();
    })

    it('Should call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalled();
    })

    it('Should call one time method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalledTimes(1);
    })

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

  });

  // Update Announcement method
  describe('Update Announcement', () => {
    // Controller
    it('Should not call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      expect(Controller.updateAnnouncement).not.toHaveBeenCalled();
    })

    it('Should call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalled();
    })

    it('Should call one time method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalledTimes(1);
    })

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

  });

  // Get Announcement method
  describe('Get Announcement', () => {
    // Controller
    it('Should not call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      expect(Controller.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalledTimes(1);
    })

    // Service
    it('Should not call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      expect(Service.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalledTimes(1);
    })

  });

  // Create Announcement method
  describe('Create Announcement', () => {
    // Controller
    it('Should not call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      expect(Controller.create).not.toHaveBeenCalled();
    })

    it('Should call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalled();
    })

    it('Should call one time method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalledTimes(1);
    })

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

  });

  // Update Announcement method
  describe('Update Announcement', () => {
    // Controller
    it('Should not call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      expect(Controller.updateAnnouncement).not.toHaveBeenCalled();
    })

    it('Should call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalled();
    })

    it('Should call one time method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalledTimes(1);
    })

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

  });


  // Get Announcement method
  describe('Get Announcement', () => {
    // Controller
    it('Should not call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      expect(Controller.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalledTimes(1);
    })

    // Service
    it('Should not call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      expect(Service.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalledTimes(1);
    })

  });

  // Create Announcement method
  describe('Create Announcement', () => {
    // Controller
    it('Should not call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      expect(Controller.create).not.toHaveBeenCalled();
    })

    it('Should call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalled();
    })

    it('Should call one time method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalledTimes(1);
    })

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

  });

  // Update Announcement method
  describe('Update Announcement', () => {
    // Controller
    it('Should not call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      expect(Controller.updateAnnouncement).not.toHaveBeenCalled();
    })

    it('Should call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalled();
    })

    it('Should call one time method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalledTimes(1);
    })

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

  });

  // Get Announcement method
  describe('Get Announcement', () => {
    // Controller
    it('Should not call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      expect(Controller.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalledTimes(1);
    })

    // Service
    it('Should not call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      expect(Service.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalledTimes(1);
    })

  });

  // Create Announcement method
  describe('Create Announcement', () => {
    // Controller
    it('Should not call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      expect(Controller.create).not.toHaveBeenCalled();
    })

    it('Should call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalled();
    })

    it('Should call one time method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalledTimes(1);
    })

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

  });

  // Update Announcement method
  describe('Update Announcement', () => {
    // Controller
    it('Should not call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      expect(Controller.updateAnnouncement).not.toHaveBeenCalled();
    })

    it('Should call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalled();
    })

    it('Should call one time method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalledTimes(1);
    })

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

  });



  // Get Announcement method
  describe('Get Announcement', () => {
    // Controller
    it('Should not call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      expect(Controller.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalledTimes(1);
    })

    // Service
    it('Should not call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      expect(Service.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalledTimes(1);
    })

  });

  // Create Announcement method
  describe('Create Announcement', () => {
    // Controller
    it('Should not call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      expect(Controller.create).not.toHaveBeenCalled();
    })

    it('Should call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalled();
    })

    it('Should call one time method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalledTimes(1);
    })

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

  });

  // Update Announcement method
  describe('Update Announcement', () => {
    // Controller
    it('Should not call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      expect(Controller.updateAnnouncement).not.toHaveBeenCalled();
    })

    it('Should call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalled();
    })

    it('Should call one time method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalledTimes(1);
    })

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

  });



  // Get Announcement method
  describe('Get Announcement', () => {
    // Controller
    it('Should not call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      expect(Controller.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalledTimes(1);
    })

    // Service
    it('Should not call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      expect(Service.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalledTimes(1);
    })

  });

  // Create Announcement method
  describe('Create Announcement', () => {
    // Controller
    it('Should not call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      expect(Controller.create).not.toHaveBeenCalled();
    })

    it('Should call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalled();
    })

    it('Should call one time method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalledTimes(1);
    })

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

  });

  // Update Announcement method
  describe('Update Announcement', () => {
    // Controller
    it('Should not call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      expect(Controller.updateAnnouncement).not.toHaveBeenCalled();
    })

    it('Should call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalled();
    })

    it('Should call one time method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalledTimes(1);
    })

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

  });


  // Get Announcement method
  describe('Get Announcement', () => {
    // Controller
    it('Should not call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      expect(Controller.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalledTimes(1);
    })

    // Service
    it('Should not call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      expect(Service.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalledTimes(1);
    })

  });

  // Create Announcement method
  describe('Create Announcement', () => {
    // Controller
    it('Should not call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      expect(Controller.create).not.toHaveBeenCalled();
    })

    it('Should call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalled();
    })

    it('Should call one time method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalledTimes(1);
    })

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

  });

  // Update Announcement method
  describe('Update Announcement', () => {
    // Controller
    it('Should not call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      expect(Controller.updateAnnouncement).not.toHaveBeenCalled();
    })

    it('Should call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalled();
    })

    it('Should call one time method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalledTimes(1);
    })

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

  });


  // Get Announcement method
  describe('Get Announcement', () => {
    // Controller
    it('Should not call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      expect(Controller.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalledTimes(1);
    })

    // Service
    it('Should not call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      expect(Service.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalledTimes(1);
    })

  });

  // Create Announcement method
  describe('Create Announcement', () => {
    // Controller
    it('Should not call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      expect(Controller.create).not.toHaveBeenCalled();
    })

    it('Should call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalled();
    })

    it('Should call one time method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalledTimes(1);
    })

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

  });

  // Update Announcement method
  describe('Update Announcement', () => {
    // Controller
    it('Should not call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      expect(Controller.updateAnnouncement).not.toHaveBeenCalled();
    })

    it('Should call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalled();
    })

    it('Should call one time method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalledTimes(1);
    })

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

  });



  // Get Announcement method
  describe('Get Announcement', () => {
    // Controller
    it('Should not call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      expect(Controller.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalledTimes(1);
    })

    // Service
    it('Should not call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      expect(Service.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalledTimes(1);
    })

  });

  // Create Announcement method
  describe('Create Announcement', () => {
    // Controller
    it('Should not call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      expect(Controller.create).not.toHaveBeenCalled();
    })

    it('Should call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalled();
    })

    it('Should call one time method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalledTimes(1);
    })

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

  });

  // Update Announcement method
  describe('Update Announcement', () => {
    // Controller
    it('Should not call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      expect(Controller.updateAnnouncement).not.toHaveBeenCalled();
    })

    it('Should call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalled();
    })

    it('Should call one time method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalledTimes(1);
    })

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

  });



  // Get Announcement method
  describe('Get Announcement', () => {
    // Controller
    it('Should not call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      expect(Controller.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalledTimes(1);
    })

    // Service
    it('Should not call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      expect(Service.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalledTimes(1);
    })

  });

  // Create Announcement method
  describe('Create Announcement', () => {
    // Controller
    it('Should not call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      expect(Controller.create).not.toHaveBeenCalled();
    })

    it('Should call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalled();
    })

    it('Should call one time method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalledTimes(1);
    })

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

  });

  // Update Announcement method
  describe('Update Announcement', () => {
    // Controller
    it('Should not call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      expect(Controller.updateAnnouncement).not.toHaveBeenCalled();
    })

    it('Should call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalled();
    })

    it('Should call one time method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalledTimes(1);
    })

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

  });


  // Get Announcement method
  describe('Get Announcement', () => {
    // Controller
    it('Should not call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      expect(Controller.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalledTimes(1);
    })

    // Service
    it('Should not call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      expect(Service.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalledTimes(1);
    })

  });

  // Create Announcement method
  describe('Create Announcement', () => {
    // Controller
    it('Should not call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      expect(Controller.create).not.toHaveBeenCalled();
    })

    it('Should call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalled();
    })

    it('Should call one time method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalledTimes(1);
    })

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

  });

  // Update Announcement method
  describe('Update Announcement', () => {
    // Controller
    it('Should not call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      expect(Controller.updateAnnouncement).not.toHaveBeenCalled();
    })

    it('Should call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalled();
    })

    it('Should call one time method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalledTimes(1);
    })

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

  });


  // Get Announcement method
  describe('Get Announcement', () => {
    // Controller
    it('Should not call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      expect(Controller.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalledTimes(1);
    })

    // Service
    it('Should not call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      expect(Service.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalledTimes(1);
    })

  });

  // Create Announcement method
  describe('Create Announcement', () => {
    // Controller
    it('Should not call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      expect(Controller.create).not.toHaveBeenCalled();
    })

    it('Should call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalled();
    })

    it('Should call one time method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalledTimes(1);
    })

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

  });

  // Update Announcement method
  describe('Update Announcement', () => {
    // Controller
    it('Should not call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      expect(Controller.updateAnnouncement).not.toHaveBeenCalled();
    })

    it('Should call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalled();
    })

    it('Should call one time method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalledTimes(1);
    })

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

  });


  // Get Announcement method
  describe('Get Announcement', () => {
    // Controller
    it('Should not call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      expect(Controller.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalledTimes(1);
    })

    // Service
    it('Should not call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      expect(Service.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalledTimes(1);
    })

  });

  // Create Announcement method
  describe('Create Announcement', () => {
    // Controller
    it('Should not call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      expect(Controller.create).not.toHaveBeenCalled();
    })

    it('Should call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalled();
    })

    it('Should call one time method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalledTimes(1);
    })

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

  });

  // Update Announcement method
  describe('Update Announcement', () => {
    // Controller
    it('Should not call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      expect(Controller.updateAnnouncement).not.toHaveBeenCalled();
    })

    it('Should call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalled();
    })

    it('Should call one time method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalledTimes(1);
    })

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

  });



  // Get Announcement method
  describe('Get Announcement', () => {
    // Controller
    it('Should not call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      expect(Controller.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalledTimes(1);
    })

    // Service
    it('Should not call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      expect(Service.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalledTimes(1);
    })

  });

  // Create Announcement method
  describe('Create Announcement', () => {
    // Controller
    it('Should not call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      expect(Controller.create).not.toHaveBeenCalled();
    })

    it('Should call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalled();
    })

    it('Should call one time method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalledTimes(1);
    })

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

  });

  // Update Announcement method
  describe('Update Announcement', () => {
    // Controller
    it('Should not call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      expect(Controller.updateAnnouncement).not.toHaveBeenCalled();
    })

    it('Should call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalled();
    })

    it('Should call one time method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalledTimes(1);
    })

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

  });



  // Get Announcement method
  describe('Get Announcement', () => {
    // Controller
    it('Should not call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      expect(Controller.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalledTimes(1);
    })

    // Service
    it('Should not call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      expect(Service.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalledTimes(1);
    })

  });

  // Create Announcement method
  describe('Create Announcement', () => {
    // Controller
    it('Should not call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      expect(Controller.create).not.toHaveBeenCalled();
    })

    it('Should call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalled();
    })

    it('Should call one time method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalledTimes(1);
    })

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

  });

  // Update Announcement method
  describe('Update Announcement', () => {
    // Controller
    it('Should not call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      expect(Controller.updateAnnouncement).not.toHaveBeenCalled();
    })

    it('Should call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalled();
    })

    it('Should call one time method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalledTimes(1);
    })

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

  });



  // Get Announcement method
  describe('Get Announcement', () => {
    // Controller
    it('Should not call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      expect(Controller.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalledTimes(1);
    })

    // Service
    it('Should not call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      expect(Service.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalledTimes(1);
    })

  });

  // Create Announcement method
  describe('Create Announcement', () => {
    // Controller
    it('Should not call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      expect(Controller.create).not.toHaveBeenCalled();
    })

    it('Should call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalled();
    })

    it('Should call one time method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalledTimes(1);
    })

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

  });

  // Update Announcement method
  describe('Update Announcement', () => {
    // Controller
    it('Should not call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      expect(Controller.updateAnnouncement).not.toHaveBeenCalled();
    })

    it('Should call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalled();
    })

    it('Should call one time method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalledTimes(1);
    })

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

  });


  // Get Announcement method
  describe('Get Announcement', () => {
    // Controller
    it('Should not call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      expect(Controller.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalledTimes(1);
    })

    // Service
    it('Should not call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      expect(Service.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalledTimes(1);
    })

  });

  // Create Announcement method
  describe('Create Announcement', () => {
    // Controller
    it('Should not call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      expect(Controller.create).not.toHaveBeenCalled();
    })

    it('Should call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalled();
    })

    it('Should call one time method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalledTimes(1);
    })

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

  });

  // Update Announcement method
  describe('Update Announcement', () => {
    // Controller
    it('Should not call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      expect(Controller.updateAnnouncement).not.toHaveBeenCalled();
    })

    it('Should call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalled();
    })

    it('Should call one time method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalledTimes(1);
    })

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

  });



  // Get Announcement method
  describe('Get Announcement', () => {
    // Controller
    it('Should not call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      expect(Controller.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalledTimes(1);
    })

    // Service
    it('Should not call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      expect(Service.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalledTimes(1);
    })

  });

  // Create Announcement method
  describe('Create Announcement', () => {
    // Controller
    it('Should not call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      expect(Controller.create).not.toHaveBeenCalled();
    })

    it('Should call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalled();
    })

    it('Should call one time method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalledTimes(1);
    })

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

  });

  // Update Announcement method
  describe('Update Announcement', () => {
    // Controller
    it('Should not call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      expect(Controller.updateAnnouncement).not.toHaveBeenCalled();
    })

    it('Should call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalled();
    })

    it('Should call one time method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalledTimes(1);
    })

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

  });



  // Get Announcement method
  describe('Get Announcement', () => {
    // Controller
    it('Should not call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      expect(Controller.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalledTimes(1);
    })

    // Service
    it('Should not call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      expect(Service.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalledTimes(1);
    })

  });

  // Create Announcement method
  describe('Create Announcement', () => {
    // Controller
    it('Should not call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      expect(Controller.create).not.toHaveBeenCalled();
    })

    it('Should call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalled();
    })

    it('Should call one time method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalledTimes(1);
    })

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

  });

  // Update Announcement method
  describe('Update Announcement', () => {
    // Controller
    it('Should not call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      expect(Controller.updateAnnouncement).not.toHaveBeenCalled();
    })

    it('Should call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalled();
    })

    it('Should call one time method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalledTimes(1);
    })

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

  });



  // Get Announcement method
  describe('Get Announcement', () => {
    // Controller
    it('Should not call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      expect(Controller.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalledTimes(1);
    })

    // Service
    it('Should not call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      expect(Service.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalledTimes(1);
    })

  });

  // Create Announcement method
  describe('Create Announcement', () => {
    // Controller
    it('Should not call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      expect(Controller.create).not.toHaveBeenCalled();
    })

    it('Should call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalled();
    })

    it('Should call one time method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalledTimes(1);
    })

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

  });

  // Update Announcement method
  describe('Update Announcement', () => {
    // Controller
    it('Should not call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      expect(Controller.updateAnnouncement).not.toHaveBeenCalled();
    })

    it('Should call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalled();
    })

    it('Should call one time method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalledTimes(1);
    })

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

  });




  // Get Announcement method
  describe('Get Announcement', () => {
    // Controller
    it('Should not call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      expect(Controller.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalledTimes(1);
    })

    // Service
    it('Should not call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      expect(Service.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalledTimes(1);
    })

  });

  // Create Announcement method
  describe('Create Announcement', () => {
    // Controller
    it('Should not call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      expect(Controller.create).not.toHaveBeenCalled();
    })

    it('Should call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalled();
    })

    it('Should call one time method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalledTimes(1);
    })

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

  });

  // Update Announcement method
  describe('Update Announcement', () => {
    // Controller
    it('Should not call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      expect(Controller.updateAnnouncement).not.toHaveBeenCalled();
    })

    it('Should call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalled();
    })

    it('Should call one time method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalledTimes(1);
    })

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

  });




  // Get Announcement method
  describe('Get Announcement', () => {
    // Controller
    it('Should not call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      expect(Controller.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalledTimes(1);
    })

    // Service
    it('Should not call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      expect(Service.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalledTimes(1);
    })

  });

  // Create Announcement method
  describe('Create Announcement', () => {
    // Controller
    it('Should not call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      expect(Controller.create).not.toHaveBeenCalled();
    })

    it('Should call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalled();
    })

    it('Should call one time method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalledTimes(1);
    })

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

  });

  // Update Announcement method
  describe('Update Announcement', () => {
    // Controller
    it('Should not call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      expect(Controller.updateAnnouncement).not.toHaveBeenCalled();
    })

    it('Should call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalled();
    })

    it('Should call one time method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalledTimes(1);
    })

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

  });



  // Get Announcement method
  describe('Get Announcement', () => {
    // Controller
    it('Should not call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      expect(Controller.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalledTimes(1);
    })

    // Service
    it('Should not call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      expect(Service.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalledTimes(1);
    })

  });

  // Create Announcement method
  describe('Create Announcement', () => {
    // Controller
    it('Should not call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      expect(Controller.create).not.toHaveBeenCalled();
    })

    it('Should call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalled();
    })

    it('Should call one time method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalledTimes(1);
    })

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

  });

  // Update Announcement method
  describe('Update Announcement', () => {
    // Controller
    it('Should not call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      expect(Controller.updateAnnouncement).not.toHaveBeenCalled();
    })

    it('Should call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalled();
    })

    it('Should call one time method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalledTimes(1);
    })

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

  });



  // Get Announcement method
  describe('Get Announcement', () => {
    // Controller
    it('Should not call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      expect(Controller.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalledTimes(1);
    })

    // Service
    it('Should not call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      expect(Service.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalledTimes(1);
    })

  });

  // Create Announcement method
  describe('Create Announcement', () => {
    // Controller
    it('Should not call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      expect(Controller.create).not.toHaveBeenCalled();
    })

    it('Should call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalled();
    })

    it('Should call one time method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalledTimes(1);
    })

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

  });

  // Update Announcement method
  describe('Update Announcement', () => {
    // Controller
    it('Should not call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      expect(Controller.updateAnnouncement).not.toHaveBeenCalled();
    })

    it('Should call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalled();
    })

    it('Should call one time method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalledTimes(1);
    })

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

  });



  // Get Announcement method
  describe('Get Announcement', () => {
    // Controller
    it('Should not call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      expect(Controller.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalledTimes(1);
    })

    // Service
    it('Should not call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      expect(Service.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalledTimes(1);
    })

  });

  // Create Announcement method
  describe('Create Announcement', () => {
    // Controller
    it('Should not call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      expect(Controller.create).not.toHaveBeenCalled();
    })

    it('Should call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalled();
    })

    it('Should call one time method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalledTimes(1);
    })

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

  });

  // Update Announcement method
  describe('Update Announcement', () => {
    // Controller
    it('Should not call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      expect(Controller.updateAnnouncement).not.toHaveBeenCalled();
    })

    it('Should call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalled();
    })

    it('Should call one time method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalledTimes(1);
    })

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

  });



  // Get Announcement method
  describe('Get Announcement', () => {
    // Controller
    it('Should not call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      expect(Controller.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in controller announcement', () => {
      spyOn(Controller, 'findAll').and.callThrough();
      Controller.findAll(null);
      expect(Controller.findAll).toHaveBeenCalledTimes(1);
    })

    // Service
    it('Should not call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      expect(Service.findAll).not.toHaveBeenCalled();
    })

    it('Should call method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalled();
    })

    it('Should call one time method get Announcement in service announcement', () => {
      spyOn(Service, 'findAll').and.callThrough();
      Service.findAll();
      expect(Service.findAll).toHaveBeenCalledTimes(1);
    })

  });

  // Create Announcement method
  describe('Create Announcement', () => {
    // Controller
    it('Should not call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      expect(Controller.create).not.toHaveBeenCalled();
    })

    it('Should call method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalled();
    })

    it('Should call one time method create Announcement in controller announcement', () => {
      spyOn(Controller, 'create').and.callThrough();
      Controller.create(CreateData, null, null);
      expect(Controller.create).toHaveBeenCalledTimes(1);
    })

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

  });

  // Update Announcement method
  describe('Update Announcement', () => {
    // Controller
    it('Should not call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      expect(Controller.updateAnnouncement).not.toHaveBeenCalled();
    })

    it('Should call method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalled();
    })

    it('Should call one time method update Announcement in controller announcement', () => {
      spyOn(Controller, 'updateAnnouncement').and.callThrough();
      Controller.updateAnnouncement(UpdateData, null, null);
      expect(Controller.updateAnnouncement).toHaveBeenCalledTimes(1);
    })

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

  });
});

