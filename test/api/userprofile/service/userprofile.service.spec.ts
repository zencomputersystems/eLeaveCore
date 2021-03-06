import { Test } from '@nestjs/testing';
import { UserInfoModel } from 'src/admin/user-info/model/user-info.model';
import { UserprofileDbService } from '../../../../src/api/userprofile/db/userprofile.db.service';
import { UpdatePersonalDetailDTO } from '../../../../src/api/userprofile/dto/userprofile-detail/personal-detail/update-personal-detail.dto';
import { UserInfoService } from 'src/admin/user-info/user-info.service';
import { UpdateEmploymentDetailDTO } from '../../../../src/api/userprofile/dto/userprofile-detail/employment-detail/update-employment-detail.dto';
import { ServiceYearCalc } from 'src/common/policy/entitlement-type/services/service-year-calculation-service/serviceYearCalc.service';
import { UserLeaveEntitlementService } from '../../../../src/api/userprofile/service/user-leave-entitlement.service';
import { UserprofileService } from '../../../../src/api/userprofile/service/userprofile.service';
import { Resource } from 'src/common/model/resource.model';
import { UserprofileAssignerService } from '../../../../src/api/userprofile/service/userprofile-assigner.service';
describe('UserprofileService', () => {
  let service: UserprofileService;
  let userprofileDbService: UserprofileDbService;
  let userInfoService: UserInfoService;
  let userLeaveEntitlementService: UserLeaveEntitlementService;
  beforeEach(async () => {
    const userInfoModelStub = { PROPERTIES_XML: {} };
    const userprofileDbServiceStub = {
      findByFilterV2: (array1, filters2) => ({ pipe: () => ({}) })
    };
    const updatePersonalDetailDTOStub = { id: {}, nickname: {} };
    const userInfoServiceStub = {
      findByFilterV2: (array1, filters2) => ({ pipe: () => ({}) }),
      updateByModel: (resource1, array2, array3, array4) => ({}),
      findByFilterV4: (array1, filters2, filters3, filters4) => ({ pipe: () => ({}) })
    };
    const updateEmploymentDetailDTOStub = {
      id: {},
      employeeNumber: {},
      designation: {},
      department: {},
      branch: {},
      division: {},
      reportingTo: {},
      dateOfJoin: {},
      dateOfResign: {},
      dateOfConfirmation: {},
      employmentStatus: {},
      employmentType: {},
      bankAccountName: {},
      bankAccountNumber: {},
      epfNumber: {},
      incomeTaxNumber: {}
    };
    const serviceYearCalcStub = { calculateEmployeeServiceYear: arg1 => ({}) };
    const userLeaveEntitlementServiceStub = {
      getEntitlementList: (tenant_guid1, user_guid2) => ({})
    };
    const userprofileAssignerServiceStub = {

    }
    const module = await Test.createTestingModule({
      providers: [
        UserprofileService,
        { provide: UserInfoModel, useValue: userInfoModelStub },
        { provide: UserprofileDbService, useValue: userprofileDbServiceStub },
        {
          provide: UpdatePersonalDetailDTO,
          useValue: updatePersonalDetailDTOStub
        },
        { provide: UserInfoService, useValue: userInfoServiceStub },
        {
          provide: UpdateEmploymentDetailDTO,
          useValue: updateEmploymentDetailDTOStub
        },
        { provide: ServiceYearCalc, useValue: serviceYearCalcStub },
        {
          provide: UserLeaveEntitlementService,
          useValue: userLeaveEntitlementServiceStub
        },
        {
          provide: UserprofileAssignerService,
          useValue: userprofileAssignerServiceStub
        }
      ]
    }).compile();
    service = await module.get<UserprofileService>(UserprofileService);
    userprofileDbService = await module.get<UserprofileDbService>(UserprofileDbService);
    userInfoService = await module.get<UserInfoService>(UserInfoService);
    userLeaveEntitlementService = await module.get<UserLeaveEntitlementService>(UserLeaveEntitlementService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('Get List', () => {
    it('should call method find by filter in get list', () => {
      const userprofileDbServiceStub: UserprofileDbService = userprofileDbService;
      spyOn(userprofileDbServiceStub, 'findByFilterV2').and.callThrough();
      expect(userprofileDbServiceStub.findByFilterV2).not.toHaveBeenCalled();
      service.getList([]);
      expect(userprofileDbServiceStub.findByFilterV2).toHaveBeenCalled();
      expect(userprofileDbServiceStub.findByFilterV2).toHaveBeenCalledTimes(1);
    })

  });

  describe('Get Detail', () => {
    it('should call method find by filter in get detail', () => {
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'findByFilterV4').and.callThrough();
      expect(userInfoServiceStub.findByFilterV4).not.toHaveBeenCalled();
      service.getDetail([]);
      expect(userInfoServiceStub.findByFilterV4).toHaveBeenCalled();
      expect(userInfoServiceStub.findByFilterV4).toHaveBeenCalledTimes(1);
    })
  });

  describe('Get Personal Detail', () => {
    it('should call method find by filter in get personal detail', () => {
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'findByFilterV4').and.callThrough();
      expect(userInfoServiceStub.findByFilterV4).not.toHaveBeenCalled();
      service.getPersonalDetail([]);
      expect(userInfoServiceStub.findByFilterV4).toHaveBeenCalled();
      expect(userInfoServiceStub.findByFilterV4).toHaveBeenCalledTimes(1);
    })
  });

  describe('Update Personal Detail', () => {
    const mockDetail: UpdatePersonalDetailDTO = new UpdatePersonalDetailDTO;

    it('should call method updateByModel in update personal detail', () => {
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'updateByModel').and.callThrough();
      expect(userInfoServiceStub.updateByModel).not.toHaveBeenCalled();
      service.updatePersonalDetail(mockDetail, 'userId');
      expect(userInfoServiceStub.updateByModel).toHaveBeenCalled();
      expect(userInfoServiceStub.updateByModel).toHaveBeenCalledTimes(1);
    })
  });

  describe('getEmploymentDetail', () => {
    it('should call method find by filter in get employment detail', () => {
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'findByFilterV2').and.callThrough();
      expect(userInfoServiceStub.findByFilterV2).not.toHaveBeenCalled();
      service.getEmploymentDetail([]);
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalled();
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalledTimes(1);
    })
  });

  describe('updateEmploymentDetail', () => {
    const mockDetail: UpdateEmploymentDetailDTO = new UpdateEmploymentDetailDTO;
    it('should call method updateByModel in update employment detail', () => {
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'updateByModel').and.callThrough();
      expect(userInfoServiceStub.updateByModel).not.toHaveBeenCalled();
      service.updateEmploymentDetail(mockDetail, 'userId');
      expect(userInfoServiceStub.updateByModel).toHaveBeenCalled();
      expect(userInfoServiceStub.updateByModel).toHaveBeenCalledTimes(1);
    })
  });

  describe('getEntitlementDetail', () => {
    it('should call method updateByModel in get entitlement detail', () => {
      const userLeaveEntitlementServiceStub: UserLeaveEntitlementService = userLeaveEntitlementService;
      spyOn(userLeaveEntitlementServiceStub, 'getEntitlementList').and.callThrough();
      expect(userLeaveEntitlementServiceStub.getEntitlementList).not.toHaveBeenCalled();
      service.getEntitlementDetail('tenantId', 'userId');
      expect(userLeaveEntitlementServiceStub.getEntitlementList).toHaveBeenCalled();
      expect(userLeaveEntitlementServiceStub.getEntitlementList).toHaveBeenCalledTimes(1);
    })
  });

  describe('getCertificationDetail', () => {
    it('should call method find by filter in get certification detail', () => {
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'findByFilterV2').and.callThrough();
      expect(userInfoServiceStub.findByFilterV2).not.toHaveBeenCalled();
      service.getCertificationDetail([]);
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalled();
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalledTimes(1);
    })
  });


});
