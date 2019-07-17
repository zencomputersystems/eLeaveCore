import { Test } from '@nestjs/testing';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { UserInfoModel } from 'src/admin/user-info/model/user-info.model';
import { UserprofileDbService } from '../db/userprofile.db.service';
import { UpdatePersonalDetailDTO } from '../dto/userprofile-detail/personal-detail/update-personal-detail.dto';
import { UserInfoService } from 'src/admin/user-info/user-info.service';
import { UpdateEmploymentDetailDTO } from '../dto/userprofile-detail/employment-detail/update-employment-detail.dto';
import { ServiceYearCalc } from 'src/common/policy/entitlement-type/services/service-year-calculation-service/serviceYearCalc.service';
import { UserLeaveEntitlementService } from './user-leave-entitlement.service';
import { UserprofileService } from './userprofile.service';
import { Resource } from 'src/common/model/resource.model';
describe('UserprofileService', () => {
  let service: UserprofileService;
  let userprofileDbService: UserprofileDbService;
  let userInfoService: UserInfoService;
  let xmlParserService: XMLParserService;
  let userLeaveEntitlementService: UserLeaveEntitlementService;
  beforeEach(async () => {
    const xMLParserServiceStub = {
      convertJsonToXML: data1 => ({}),
      convertXMLToJson: arg1 => ({})
    };
    const userInfoModelStub = { PROPERTIES_XML: {} };
    const userprofileDbServiceStub = {
      findByFilterV2: (array1, filters2) => ({ pipe: () => ({}) })
    };
    const updatePersonalDetailDTOStub = { id: {}, nickname: {} };
    const userInfoServiceStub = {
      findByFilterV2: (array1, filters2) => ({ pipe: () => ({}) }),
      updateByModel: (resource1, array2, array3, array4) => ({})
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
    const module = await Test.createTestingModule({
      providers: [
        UserprofileService,
        { provide: XMLParserService, useValue: xMLParserServiceStub },
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
        }
      ]
    }).compile();
    service = await module.get<UserprofileService>(UserprofileService);
    userprofileDbService = await module.get<UserprofileDbService>(UserprofileDbService);
    userInfoService = await module.get<UserInfoService>(UserInfoService);
    xmlParserService = await module.get<XMLParserService>(XMLParserService);
    userLeaveEntitlementService = await module.get<UserLeaveEntitlementService>(UserLeaveEntitlementService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

  describe('Get List', () =>{
    it('should call method find by filter in get list',()=>{
      const userprofileDbServiceStub: UserprofileDbService = userprofileDbService;
      spyOn(userprofileDbServiceStub, 'findByFilterV2').and.callThrough();
      expect(userprofileDbServiceStub.findByFilterV2).not.toHaveBeenCalled();
      service.getList([]);
      expect(userprofileDbServiceStub.findByFilterV2).toHaveBeenCalled();
      expect(userprofileDbServiceStub.findByFilterV2).toHaveBeenCalledTimes(1);
    })
  });

  describe('Get Detail', () =>{
    it('should call method find by filter in get detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'findByFilterV2').and.callThrough();
      expect(userInfoServiceStub.findByFilterV2).not.toHaveBeenCalled();
      service.getDetail([]);
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalled();
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalledTimes(1);
    })
  });

  describe('Get Personal Detail', () =>{
    it('should call method find by filter in get personal detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'findByFilterV2').and.callThrough();
      expect(userInfoServiceStub.findByFilterV2).not.toHaveBeenCalled();
      service.getPersonalDetail([]);
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalled();
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalledTimes(1);
    })
  });

  describe('Update Personal Detail', () =>{
    const mockDetail:UpdatePersonalDetailDTO = new UpdatePersonalDetailDTO;
    it('should call method convertJsonToXML in update personal detail',()=>{
      const xmlParserServiceStub: XMLParserService = xmlParserService;
      spyOn(xmlParserServiceStub, 'convertJsonToXML').and.callThrough();
      expect(xmlParserServiceStub.convertJsonToXML).not.toHaveBeenCalled();
      service.updatePersonalDetail(mockDetail,'userId');
      expect(xmlParserServiceStub.convertJsonToXML).toHaveBeenCalled();
      expect(xmlParserServiceStub.convertJsonToXML).toHaveBeenCalledTimes(1);
    })
    
    it('should call method updateByModel in update personal detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'updateByModel').and.callThrough();
      expect(userInfoServiceStub.updateByModel).not.toHaveBeenCalled();
      service.updatePersonalDetail(mockDetail,'userId');
      expect(userInfoServiceStub.updateByModel).toHaveBeenCalled();
      expect(userInfoServiceStub.updateByModel).toHaveBeenCalledTimes(1);
    })
  });

  describe('getEmploymentDetail', () =>{
    it('should call method find by filter in get employment detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'findByFilterV2').and.callThrough();
      expect(userInfoServiceStub.findByFilterV2).not.toHaveBeenCalled();
      service.getEmploymentDetail([]);
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalled();
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalledTimes(1);
    })
  });

  describe('updateEmploymentDetail', () =>{
    const mockDetail: UpdateEmploymentDetailDTO = new UpdateEmploymentDetailDTO;
    it('should call method updateByModel in update employment detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'updateByModel').and.callThrough();
      expect(userInfoServiceStub.updateByModel).not.toHaveBeenCalled();
      service.updateEmploymentDetail(mockDetail,'userId');
      expect(userInfoServiceStub.updateByModel).toHaveBeenCalled();
      expect(userInfoServiceStub.updateByModel).toHaveBeenCalledTimes(1);
    })
  });
  
  describe('getEntitlementDetail', () =>{
    it('should call method updateByModel in get entitlement detail',()=>{
      const userLeaveEntitlementServiceStub: UserLeaveEntitlementService = userLeaveEntitlementService;
      spyOn(userLeaveEntitlementServiceStub, 'getEntitlementList').and.callThrough();
      expect(userLeaveEntitlementServiceStub.getEntitlementList).not.toHaveBeenCalled();
      service.getEntitlementDetail('tenantId','userId');
      expect(userLeaveEntitlementServiceStub.getEntitlementList).toHaveBeenCalled();
      expect(userLeaveEntitlementServiceStub.getEntitlementList).toHaveBeenCalledTimes(1);
    })
  });
  
  describe('getCertificationDetail', () =>{
    it('should call method find by filter in get certification detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'findByFilterV2').and.callThrough();
      expect(userInfoServiceStub.findByFilterV2).not.toHaveBeenCalled();
      service.getCertificationDetail([]);
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalled();
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalledTimes(1);
    })
  });
  
  describe('personaldetailProcess', () =>{
    it('should call method convertJsonToXML in personal detail process',()=>{
      const xmlParserServiceStub: XMLParserService = xmlParserService;
      spyOn(xmlParserServiceStub, 'convertXMLToJson').and.callThrough();
      expect(xmlParserServiceStub.convertXMLToJson).not.toHaveBeenCalled();
      service.personaldetailProcess(new UserInfoModel,true,true,[]);
      expect(xmlParserServiceStub.convertXMLToJson).toHaveBeenCalled();
      expect(xmlParserServiceStub.convertXMLToJson).toHaveBeenCalledTimes(1);
    })
  });


  // temp to test

  describe('Get List', () =>{
    it('should call method find by filter in get list',()=>{
      const userprofileDbServiceStub: UserprofileDbService = userprofileDbService;
      spyOn(userprofileDbServiceStub, 'findByFilterV2').and.callThrough();
      expect(userprofileDbServiceStub.findByFilterV2).not.toHaveBeenCalled();
      service.getList([]);
      expect(userprofileDbServiceStub.findByFilterV2).toHaveBeenCalled();
      expect(userprofileDbServiceStub.findByFilterV2).toHaveBeenCalledTimes(1);
    })
  });

  describe('Get Detail', () =>{
    it('should call method find by filter in get detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'findByFilterV2').and.callThrough();
      expect(userInfoServiceStub.findByFilterV2).not.toHaveBeenCalled();
      service.getDetail([]);
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalled();
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalledTimes(1);
    })
  });

  describe('Get Personal Detail', () =>{
    it('should call method find by filter in get personal detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'findByFilterV2').and.callThrough();
      expect(userInfoServiceStub.findByFilterV2).not.toHaveBeenCalled();
      service.getPersonalDetail([]);
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalled();
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalledTimes(1);
    })
  });

  describe('Update Personal Detail', () =>{
    const mockDetail:UpdatePersonalDetailDTO = new UpdatePersonalDetailDTO;
    it('should call method convertJsonToXML in update personal detail',()=>{
      const xmlParserServiceStub: XMLParserService = xmlParserService;
      spyOn(xmlParserServiceStub, 'convertJsonToXML').and.callThrough();
      expect(xmlParserServiceStub.convertJsonToXML).not.toHaveBeenCalled();
      service.updatePersonalDetail(mockDetail,'userId');
      expect(xmlParserServiceStub.convertJsonToXML).toHaveBeenCalled();
      expect(xmlParserServiceStub.convertJsonToXML).toHaveBeenCalledTimes(1);
    })
    
    it('should call method updateByModel in update personal detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'updateByModel').and.callThrough();
      expect(userInfoServiceStub.updateByModel).not.toHaveBeenCalled();
      service.updatePersonalDetail(mockDetail,'userId');
      expect(userInfoServiceStub.updateByModel).toHaveBeenCalled();
      expect(userInfoServiceStub.updateByModel).toHaveBeenCalledTimes(1);
    })
  });

  describe('getEmploymentDetail', () =>{
    it('should call method find by filter in get employment detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'findByFilterV2').and.callThrough();
      expect(userInfoServiceStub.findByFilterV2).not.toHaveBeenCalled();
      service.getEmploymentDetail([]);
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalled();
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalledTimes(1);
    })
  });

  describe('updateEmploymentDetail', () =>{
    const mockDetail: UpdateEmploymentDetailDTO = new UpdateEmploymentDetailDTO;
    it('should call method updateByModel in update employment detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'updateByModel').and.callThrough();
      expect(userInfoServiceStub.updateByModel).not.toHaveBeenCalled();
      service.updateEmploymentDetail(mockDetail,'userId');
      expect(userInfoServiceStub.updateByModel).toHaveBeenCalled();
      expect(userInfoServiceStub.updateByModel).toHaveBeenCalledTimes(1);
    })
  });
  
  describe('getEntitlementDetail', () =>{
    it('should call method updateByModel in get entitlement detail',()=>{
      const userLeaveEntitlementServiceStub: UserLeaveEntitlementService = userLeaveEntitlementService;
      spyOn(userLeaveEntitlementServiceStub, 'getEntitlementList').and.callThrough();
      expect(userLeaveEntitlementServiceStub.getEntitlementList).not.toHaveBeenCalled();
      service.getEntitlementDetail('tenantId','userId');
      expect(userLeaveEntitlementServiceStub.getEntitlementList).toHaveBeenCalled();
      expect(userLeaveEntitlementServiceStub.getEntitlementList).toHaveBeenCalledTimes(1);
    })
  });
  
  describe('getCertificationDetail', () =>{
    it('should call method find by filter in get certification detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'findByFilterV2').and.callThrough();
      expect(userInfoServiceStub.findByFilterV2).not.toHaveBeenCalled();
      service.getCertificationDetail([]);
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalled();
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalledTimes(1);
    })
  });
  
  describe('personaldetailProcess', () =>{
    it('should call method convertJsonToXML in personal detail process',()=>{
      const xmlParserServiceStub: XMLParserService = xmlParserService;
      spyOn(xmlParserServiceStub, 'convertXMLToJson').and.callThrough();
      expect(xmlParserServiceStub.convertXMLToJson).not.toHaveBeenCalled();
      service.personaldetailProcess(new UserInfoModel,true,true,[]);
      expect(xmlParserServiceStub.convertXMLToJson).toHaveBeenCalled();
      expect(xmlParserServiceStub.convertXMLToJson).toHaveBeenCalledTimes(1);
    })
  });


  //repeat
  describe('Get List', () =>{
    it('should call method find by filter in get list',()=>{
      const userprofileDbServiceStub: UserprofileDbService = userprofileDbService;
      spyOn(userprofileDbServiceStub, 'findByFilterV2').and.callThrough();
      expect(userprofileDbServiceStub.findByFilterV2).not.toHaveBeenCalled();
      service.getList([]);
      expect(userprofileDbServiceStub.findByFilterV2).toHaveBeenCalled();
      expect(userprofileDbServiceStub.findByFilterV2).toHaveBeenCalledTimes(1);
    })
  });

  describe('Get Detail', () =>{
    it('should call method find by filter in get detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'findByFilterV2').and.callThrough();
      expect(userInfoServiceStub.findByFilterV2).not.toHaveBeenCalled();
      service.getDetail([]);
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalled();
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalledTimes(1);
    })
  });

  describe('Get Personal Detail', () =>{
    it('should call method find by filter in get personal detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'findByFilterV2').and.callThrough();
      expect(userInfoServiceStub.findByFilterV2).not.toHaveBeenCalled();
      service.getPersonalDetail([]);
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalled();
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalledTimes(1);
    })
  });

  describe('Update Personal Detail', () =>{
    const mockDetail:UpdatePersonalDetailDTO = new UpdatePersonalDetailDTO;
    it('should call method convertJsonToXML in update personal detail',()=>{
      const xmlParserServiceStub: XMLParserService = xmlParserService;
      spyOn(xmlParserServiceStub, 'convertJsonToXML').and.callThrough();
      expect(xmlParserServiceStub.convertJsonToXML).not.toHaveBeenCalled();
      service.updatePersonalDetail(mockDetail,'userId');
      expect(xmlParserServiceStub.convertJsonToXML).toHaveBeenCalled();
      expect(xmlParserServiceStub.convertJsonToXML).toHaveBeenCalledTimes(1);
    })
    
    it('should call method updateByModel in update personal detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'updateByModel').and.callThrough();
      expect(userInfoServiceStub.updateByModel).not.toHaveBeenCalled();
      service.updatePersonalDetail(mockDetail,'userId');
      expect(userInfoServiceStub.updateByModel).toHaveBeenCalled();
      expect(userInfoServiceStub.updateByModel).toHaveBeenCalledTimes(1);
    })
  });

  describe('getEmploymentDetail', () =>{
    it('should call method find by filter in get employment detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'findByFilterV2').and.callThrough();
      expect(userInfoServiceStub.findByFilterV2).not.toHaveBeenCalled();
      service.getEmploymentDetail([]);
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalled();
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalledTimes(1);
    })
  });

  describe('updateEmploymentDetail', () =>{
    const mockDetail: UpdateEmploymentDetailDTO = new UpdateEmploymentDetailDTO;
    it('should call method updateByModel in update employment detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'updateByModel').and.callThrough();
      expect(userInfoServiceStub.updateByModel).not.toHaveBeenCalled();
      service.updateEmploymentDetail(mockDetail,'userId');
      expect(userInfoServiceStub.updateByModel).toHaveBeenCalled();
      expect(userInfoServiceStub.updateByModel).toHaveBeenCalledTimes(1);
    })
  });
  
  describe('getEntitlementDetail', () =>{
    it('should call method updateByModel in get entitlement detail',()=>{
      const userLeaveEntitlementServiceStub: UserLeaveEntitlementService = userLeaveEntitlementService;
      spyOn(userLeaveEntitlementServiceStub, 'getEntitlementList').and.callThrough();
      expect(userLeaveEntitlementServiceStub.getEntitlementList).not.toHaveBeenCalled();
      service.getEntitlementDetail('tenantId','userId');
      expect(userLeaveEntitlementServiceStub.getEntitlementList).toHaveBeenCalled();
      expect(userLeaveEntitlementServiceStub.getEntitlementList).toHaveBeenCalledTimes(1);
    })
  });
  
  describe('getCertificationDetail', () =>{
    it('should call method find by filter in get certification detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'findByFilterV2').and.callThrough();
      expect(userInfoServiceStub.findByFilterV2).not.toHaveBeenCalled();
      service.getCertificationDetail([]);
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalled();
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalledTimes(1);
    })
  });
  
  describe('personaldetailProcess', () =>{
    it('should call method convertJsonToXML in personal detail process',()=>{
      const xmlParserServiceStub: XMLParserService = xmlParserService;
      spyOn(xmlParserServiceStub, 'convertXMLToJson').and.callThrough();
      expect(xmlParserServiceStub.convertXMLToJson).not.toHaveBeenCalled();
      service.personaldetailProcess(new UserInfoModel,true,true,[]);
      expect(xmlParserServiceStub.convertXMLToJson).toHaveBeenCalled();
      expect(xmlParserServiceStub.convertXMLToJson).toHaveBeenCalledTimes(1);
    })
  });

  
  // again

  describe('Get List', () =>{
    it('should call method find by filter in get list',()=>{
      const userprofileDbServiceStub: UserprofileDbService = userprofileDbService;
      spyOn(userprofileDbServiceStub, 'findByFilterV2').and.callThrough();
      expect(userprofileDbServiceStub.findByFilterV2).not.toHaveBeenCalled();
      service.getList([]);
      expect(userprofileDbServiceStub.findByFilterV2).toHaveBeenCalled();
      expect(userprofileDbServiceStub.findByFilterV2).toHaveBeenCalledTimes(1);
    })
  });

  describe('Get Detail', () =>{
    it('should call method find by filter in get detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'findByFilterV2').and.callThrough();
      expect(userInfoServiceStub.findByFilterV2).not.toHaveBeenCalled();
      service.getDetail([]);
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalled();
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalledTimes(1);
    })
  });

  describe('Get Personal Detail', () =>{
    it('should call method find by filter in get personal detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'findByFilterV2').and.callThrough();
      expect(userInfoServiceStub.findByFilterV2).not.toHaveBeenCalled();
      service.getPersonalDetail([]);
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalled();
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalledTimes(1);
    })
  });

  describe('Update Personal Detail', () =>{
    const mockDetail:UpdatePersonalDetailDTO = new UpdatePersonalDetailDTO;
    it('should call method convertJsonToXML in update personal detail',()=>{
      const xmlParserServiceStub: XMLParserService = xmlParserService;
      spyOn(xmlParserServiceStub, 'convertJsonToXML').and.callThrough();
      expect(xmlParserServiceStub.convertJsonToXML).not.toHaveBeenCalled();
      service.updatePersonalDetail(mockDetail,'userId');
      expect(xmlParserServiceStub.convertJsonToXML).toHaveBeenCalled();
      expect(xmlParserServiceStub.convertJsonToXML).toHaveBeenCalledTimes(1);
    })
    
    it('should call method updateByModel in update personal detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'updateByModel').and.callThrough();
      expect(userInfoServiceStub.updateByModel).not.toHaveBeenCalled();
      service.updatePersonalDetail(mockDetail,'userId');
      expect(userInfoServiceStub.updateByModel).toHaveBeenCalled();
      expect(userInfoServiceStub.updateByModel).toHaveBeenCalledTimes(1);
    })
  });

  describe('getEmploymentDetail', () =>{
    it('should call method find by filter in get employment detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'findByFilterV2').and.callThrough();
      expect(userInfoServiceStub.findByFilterV2).not.toHaveBeenCalled();
      service.getEmploymentDetail([]);
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalled();
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalledTimes(1);
    })
  });

  describe('updateEmploymentDetail', () =>{
    const mockDetail: UpdateEmploymentDetailDTO = new UpdateEmploymentDetailDTO;
    it('should call method updateByModel in update employment detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'updateByModel').and.callThrough();
      expect(userInfoServiceStub.updateByModel).not.toHaveBeenCalled();
      service.updateEmploymentDetail(mockDetail,'userId');
      expect(userInfoServiceStub.updateByModel).toHaveBeenCalled();
      expect(userInfoServiceStub.updateByModel).toHaveBeenCalledTimes(1);
    })
  });
  
  describe('getEntitlementDetail', () =>{
    it('should call method updateByModel in get entitlement detail',()=>{
      const userLeaveEntitlementServiceStub: UserLeaveEntitlementService = userLeaveEntitlementService;
      spyOn(userLeaveEntitlementServiceStub, 'getEntitlementList').and.callThrough();
      expect(userLeaveEntitlementServiceStub.getEntitlementList).not.toHaveBeenCalled();
      service.getEntitlementDetail('tenantId','userId');
      expect(userLeaveEntitlementServiceStub.getEntitlementList).toHaveBeenCalled();
      expect(userLeaveEntitlementServiceStub.getEntitlementList).toHaveBeenCalledTimes(1);
    })
  });
  
  describe('getCertificationDetail', () =>{
    it('should call method find by filter in get certification detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'findByFilterV2').and.callThrough();
      expect(userInfoServiceStub.findByFilterV2).not.toHaveBeenCalled();
      service.getCertificationDetail([]);
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalled();
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalledTimes(1);
    })
  });
  
  describe('personaldetailProcess', () =>{
    it('should call method convertJsonToXML in personal detail process',()=>{
      const xmlParserServiceStub: XMLParserService = xmlParserService;
      spyOn(xmlParserServiceStub, 'convertXMLToJson').and.callThrough();
      expect(xmlParserServiceStub.convertXMLToJson).not.toHaveBeenCalled();
      service.personaldetailProcess(new UserInfoModel,true,true,[]);
      expect(xmlParserServiceStub.convertXMLToJson).toHaveBeenCalled();
      expect(xmlParserServiceStub.convertXMLToJson).toHaveBeenCalledTimes(1);
    })
  });

  // and again

  describe('Get List', () =>{
    it('should call method find by filter in get list',()=>{
      const userprofileDbServiceStub: UserprofileDbService = userprofileDbService;
      spyOn(userprofileDbServiceStub, 'findByFilterV2').and.callThrough();
      expect(userprofileDbServiceStub.findByFilterV2).not.toHaveBeenCalled();
      service.getList([]);
      expect(userprofileDbServiceStub.findByFilterV2).toHaveBeenCalled();
      expect(userprofileDbServiceStub.findByFilterV2).toHaveBeenCalledTimes(1);
    })
  });

  describe('Get Detail', () =>{
    it('should call method find by filter in get detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'findByFilterV2').and.callThrough();
      expect(userInfoServiceStub.findByFilterV2).not.toHaveBeenCalled();
      service.getDetail([]);
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalled();
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalledTimes(1);
    })
  });

  describe('Get Personal Detail', () =>{
    it('should call method find by filter in get personal detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'findByFilterV2').and.callThrough();
      expect(userInfoServiceStub.findByFilterV2).not.toHaveBeenCalled();
      service.getPersonalDetail([]);
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalled();
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalledTimes(1);
    })
  });

  describe('Update Personal Detail', () =>{
    const mockDetail:UpdatePersonalDetailDTO = new UpdatePersonalDetailDTO;
    it('should call method convertJsonToXML in update personal detail',()=>{
      const xmlParserServiceStub: XMLParserService = xmlParserService;
      spyOn(xmlParserServiceStub, 'convertJsonToXML').and.callThrough();
      expect(xmlParserServiceStub.convertJsonToXML).not.toHaveBeenCalled();
      service.updatePersonalDetail(mockDetail,'userId');
      expect(xmlParserServiceStub.convertJsonToXML).toHaveBeenCalled();
      expect(xmlParserServiceStub.convertJsonToXML).toHaveBeenCalledTimes(1);
    })
    
    it('should call method updateByModel in update personal detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'updateByModel').and.callThrough();
      expect(userInfoServiceStub.updateByModel).not.toHaveBeenCalled();
      service.updatePersonalDetail(mockDetail,'userId');
      expect(userInfoServiceStub.updateByModel).toHaveBeenCalled();
      expect(userInfoServiceStub.updateByModel).toHaveBeenCalledTimes(1);
    })
  });

  describe('getEmploymentDetail', () =>{
    it('should call method find by filter in get employment detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'findByFilterV2').and.callThrough();
      expect(userInfoServiceStub.findByFilterV2).not.toHaveBeenCalled();
      service.getEmploymentDetail([]);
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalled();
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalledTimes(1);
    })
  });

  describe('updateEmploymentDetail', () =>{
    const mockDetail: UpdateEmploymentDetailDTO = new UpdateEmploymentDetailDTO;
    it('should call method updateByModel in update employment detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'updateByModel').and.callThrough();
      expect(userInfoServiceStub.updateByModel).not.toHaveBeenCalled();
      service.updateEmploymentDetail(mockDetail,'userId');
      expect(userInfoServiceStub.updateByModel).toHaveBeenCalled();
      expect(userInfoServiceStub.updateByModel).toHaveBeenCalledTimes(1);
    })
  });
  
  describe('getEntitlementDetail', () =>{
    it('should call method updateByModel in get entitlement detail',()=>{
      const userLeaveEntitlementServiceStub: UserLeaveEntitlementService = userLeaveEntitlementService;
      spyOn(userLeaveEntitlementServiceStub, 'getEntitlementList').and.callThrough();
      expect(userLeaveEntitlementServiceStub.getEntitlementList).not.toHaveBeenCalled();
      service.getEntitlementDetail('tenantId','userId');
      expect(userLeaveEntitlementServiceStub.getEntitlementList).toHaveBeenCalled();
      expect(userLeaveEntitlementServiceStub.getEntitlementList).toHaveBeenCalledTimes(1);
    })
  });
  
  describe('getCertificationDetail', () =>{
    it('should call method find by filter in get certification detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'findByFilterV2').and.callThrough();
      expect(userInfoServiceStub.findByFilterV2).not.toHaveBeenCalled();
      service.getCertificationDetail([]);
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalled();
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalledTimes(1);
    })
  });
  
  describe('personaldetailProcess', () =>{
    it('should call method convertJsonToXML in personal detail process',()=>{
      const xmlParserServiceStub: XMLParserService = xmlParserService;
      spyOn(xmlParserServiceStub, 'convertXMLToJson').and.callThrough();
      expect(xmlParserServiceStub.convertXMLToJson).not.toHaveBeenCalled();
      service.personaldetailProcess(new UserInfoModel,true,true,[]);
      expect(xmlParserServiceStub.convertXMLToJson).toHaveBeenCalled();
      expect(xmlParserServiceStub.convertXMLToJson).toHaveBeenCalledTimes(1);
    })
  });


  //and again
  describe('Get List', () =>{
    it('should call method find by filter in get list',()=>{
      const userprofileDbServiceStub: UserprofileDbService = userprofileDbService;
      spyOn(userprofileDbServiceStub, 'findByFilterV2').and.callThrough();
      expect(userprofileDbServiceStub.findByFilterV2).not.toHaveBeenCalled();
      service.getList([]);
      expect(userprofileDbServiceStub.findByFilterV2).toHaveBeenCalled();
      expect(userprofileDbServiceStub.findByFilterV2).toHaveBeenCalledTimes(1);
    })
  });

  describe('Get Detail', () =>{
    it('should call method find by filter in get detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'findByFilterV2').and.callThrough();
      expect(userInfoServiceStub.findByFilterV2).not.toHaveBeenCalled();
      service.getDetail([]);
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalled();
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalledTimes(1);
    })
  });

  describe('Get Personal Detail', () =>{
    it('should call method find by filter in get personal detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'findByFilterV2').and.callThrough();
      expect(userInfoServiceStub.findByFilterV2).not.toHaveBeenCalled();
      service.getPersonalDetail([]);
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalled();
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalledTimes(1);
    })
  });

  describe('Update Personal Detail', () =>{
    const mockDetail:UpdatePersonalDetailDTO = new UpdatePersonalDetailDTO;
    it('should call method convertJsonToXML in update personal detail',()=>{
      const xmlParserServiceStub: XMLParserService = xmlParserService;
      spyOn(xmlParserServiceStub, 'convertJsonToXML').and.callThrough();
      expect(xmlParserServiceStub.convertJsonToXML).not.toHaveBeenCalled();
      service.updatePersonalDetail(mockDetail,'userId');
      expect(xmlParserServiceStub.convertJsonToXML).toHaveBeenCalled();
      expect(xmlParserServiceStub.convertJsonToXML).toHaveBeenCalledTimes(1);
    })
    
    it('should call method updateByModel in update personal detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'updateByModel').and.callThrough();
      expect(userInfoServiceStub.updateByModel).not.toHaveBeenCalled();
      service.updatePersonalDetail(mockDetail,'userId');
      expect(userInfoServiceStub.updateByModel).toHaveBeenCalled();
      expect(userInfoServiceStub.updateByModel).toHaveBeenCalledTimes(1);
    })
  });

  describe('getEmploymentDetail', () =>{
    it('should call method find by filter in get employment detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'findByFilterV2').and.callThrough();
      expect(userInfoServiceStub.findByFilterV2).not.toHaveBeenCalled();
      service.getEmploymentDetail([]);
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalled();
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalledTimes(1);
    })
  });

  describe('updateEmploymentDetail', () =>{
    const mockDetail: UpdateEmploymentDetailDTO = new UpdateEmploymentDetailDTO;
    it('should call method updateByModel in update employment detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'updateByModel').and.callThrough();
      expect(userInfoServiceStub.updateByModel).not.toHaveBeenCalled();
      service.updateEmploymentDetail(mockDetail,'userId');
      expect(userInfoServiceStub.updateByModel).toHaveBeenCalled();
      expect(userInfoServiceStub.updateByModel).toHaveBeenCalledTimes(1);
    })
  });
  
  describe('getEntitlementDetail', () =>{
    it('should call method updateByModel in get entitlement detail',()=>{
      const userLeaveEntitlementServiceStub: UserLeaveEntitlementService = userLeaveEntitlementService;
      spyOn(userLeaveEntitlementServiceStub, 'getEntitlementList').and.callThrough();
      expect(userLeaveEntitlementServiceStub.getEntitlementList).not.toHaveBeenCalled();
      service.getEntitlementDetail('tenantId','userId');
      expect(userLeaveEntitlementServiceStub.getEntitlementList).toHaveBeenCalled();
      expect(userLeaveEntitlementServiceStub.getEntitlementList).toHaveBeenCalledTimes(1);
    })
  });
  
  describe('getCertificationDetail', () =>{
    it('should call method find by filter in get certification detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'findByFilterV2').and.callThrough();
      expect(userInfoServiceStub.findByFilterV2).not.toHaveBeenCalled();
      service.getCertificationDetail([]);
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalled();
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalledTimes(1);
    })
  });
  
  describe('personaldetailProcess', () =>{
    it('should call method convertJsonToXML in personal detail process',()=>{
      const xmlParserServiceStub: XMLParserService = xmlParserService;
      spyOn(xmlParserServiceStub, 'convertXMLToJson').and.callThrough();
      expect(xmlParserServiceStub.convertXMLToJson).not.toHaveBeenCalled();
      service.personaldetailProcess(new UserInfoModel,true,true,[]);
      expect(xmlParserServiceStub.convertXMLToJson).toHaveBeenCalled();
      expect(xmlParserServiceStub.convertXMLToJson).toHaveBeenCalledTimes(1);
    })
  });


  //and last
  describe('Get List', () =>{
    it('should call method find by filter in get list',()=>{
      const userprofileDbServiceStub: UserprofileDbService = userprofileDbService;
      spyOn(userprofileDbServiceStub, 'findByFilterV2').and.callThrough();
      expect(userprofileDbServiceStub.findByFilterV2).not.toHaveBeenCalled();
      service.getList([]);
      expect(userprofileDbServiceStub.findByFilterV2).toHaveBeenCalled();
      expect(userprofileDbServiceStub.findByFilterV2).toHaveBeenCalledTimes(1);
    })
  });

  describe('Get Detail', () =>{
    it('should call method find by filter in get detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'findByFilterV2').and.callThrough();
      expect(userInfoServiceStub.findByFilterV2).not.toHaveBeenCalled();
      service.getDetail([]);
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalled();
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalledTimes(1);
    })
  });

  describe('Get Personal Detail', () =>{
    it('should call method find by filter in get personal detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'findByFilterV2').and.callThrough();
      expect(userInfoServiceStub.findByFilterV2).not.toHaveBeenCalled();
      service.getPersonalDetail([]);
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalled();
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalledTimes(1);
    })
  });

  describe('Update Personal Detail', () =>{
    const mockDetail:UpdatePersonalDetailDTO = new UpdatePersonalDetailDTO;
    it('should call method convertJsonToXML in update personal detail',()=>{
      const xmlParserServiceStub: XMLParserService = xmlParserService;
      spyOn(xmlParserServiceStub, 'convertJsonToXML').and.callThrough();
      expect(xmlParserServiceStub.convertJsonToXML).not.toHaveBeenCalled();
      service.updatePersonalDetail(mockDetail,'userId');
      expect(xmlParserServiceStub.convertJsonToXML).toHaveBeenCalled();
      expect(xmlParserServiceStub.convertJsonToXML).toHaveBeenCalledTimes(1);
    })
    
    it('should call method updateByModel in update personal detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'updateByModel').and.callThrough();
      expect(userInfoServiceStub.updateByModel).not.toHaveBeenCalled();
      service.updatePersonalDetail(mockDetail,'userId');
      expect(userInfoServiceStub.updateByModel).toHaveBeenCalled();
      expect(userInfoServiceStub.updateByModel).toHaveBeenCalledTimes(1);
    })
  });

  describe('getEmploymentDetail', () =>{
    it('should call method find by filter in get employment detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'findByFilterV2').and.callThrough();
      expect(userInfoServiceStub.findByFilterV2).not.toHaveBeenCalled();
      service.getEmploymentDetail([]);
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalled();
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalledTimes(1);
    })
  });

  describe('updateEmploymentDetail', () =>{
    const mockDetail: UpdateEmploymentDetailDTO = new UpdateEmploymentDetailDTO;
    it('should call method updateByModel in update employment detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'updateByModel').and.callThrough();
      expect(userInfoServiceStub.updateByModel).not.toHaveBeenCalled();
      service.updateEmploymentDetail(mockDetail,'userId');
      expect(userInfoServiceStub.updateByModel).toHaveBeenCalled();
      expect(userInfoServiceStub.updateByModel).toHaveBeenCalledTimes(1);
    })
  });
  
  describe('getEntitlementDetail', () =>{
    it('should call method updateByModel in get entitlement detail',()=>{
      const userLeaveEntitlementServiceStub: UserLeaveEntitlementService = userLeaveEntitlementService;
      spyOn(userLeaveEntitlementServiceStub, 'getEntitlementList').and.callThrough();
      expect(userLeaveEntitlementServiceStub.getEntitlementList).not.toHaveBeenCalled();
      service.getEntitlementDetail('tenantId','userId');
      expect(userLeaveEntitlementServiceStub.getEntitlementList).toHaveBeenCalled();
      expect(userLeaveEntitlementServiceStub.getEntitlementList).toHaveBeenCalledTimes(1);
    })
  });
  
  describe('getCertificationDetail', () =>{
    it('should call method find by filter in get certification detail',()=>{
      const userInfoServiceStub: UserInfoService = userInfoService;
      spyOn(userInfoServiceStub, 'findByFilterV2').and.callThrough();
      expect(userInfoServiceStub.findByFilterV2).not.toHaveBeenCalled();
      service.getCertificationDetail([]);
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalled();
      expect(userInfoServiceStub.findByFilterV2).toHaveBeenCalledTimes(1);
    })
  });
  
  describe('personaldetailProcess', () =>{
    it('should call method convertJsonToXML in personal detail process',()=>{
      const xmlParserServiceStub: XMLParserService = xmlParserService;
      spyOn(xmlParserServiceStub, 'convertXMLToJson').and.callThrough();
      expect(xmlParserServiceStub.convertXMLToJson).not.toHaveBeenCalled();
      service.personaldetailProcess(new UserInfoModel,true,true,[]);
      expect(xmlParserServiceStub.convertXMLToJson).toHaveBeenCalled();
      expect(xmlParserServiceStub.convertXMLToJson).toHaveBeenCalledTimes(1);
    })
  });
  
});
