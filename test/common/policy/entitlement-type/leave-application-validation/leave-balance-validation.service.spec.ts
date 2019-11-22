import { Test } from '@nestjs/testing';
import { ApplyLeaveDTO } from 'src/api/leave/dto/apply-leave.dto';
import { DateCalculationService } from 'src/common/calculation/service/date-calculation.service';
import { LeaveTypePropertiesXmlDTO } from 'src/admin/leavetype-entitlement/dto/xml/leavetype-properties.xml.dto';
import { EntitledFullService } from '../../../../../src/common/policy/entitlement-type/services/leave-entitlement-type/entitledFull.service';
import { ProratedDateCurrentMonthService } from '../../../../../src/common/policy/entitlement-type/services/leave-entitlement-type/proratedDateCurrentMonth.service';
import { ProratedDateEndYearService } from '../../../../../src/common/policy/entitlement-type/services/leave-entitlement-type/proratedDateEndYear.service';
import { UserInfoModel } from 'src/admin/user-info/model/user-info.model';
import { ServiceYearCalc } from '../../../../../src/common/policy/entitlement-type/services/service-year-calculation-service/serviceYearCalc.service';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { LeaveTransactionDbService } from 'src/api/leave/db/leave-transaction.db.service';
import { LeaveBalanceValidationService } from '../../../../../src/common/policy/leave-application-validation/services/leave-balance-validation.service';
import { LeaveBalanceValidationParentService } from '../../../../../src/common/policy/leave-application-validation/services/leave-balance-validation-parent.service';
describe('LeaveBalanceValidationService', () => {
  let service: LeaveBalanceValidationService;
  let leaveTypePropertiesXmlDTO: LeaveTypePropertiesXmlDTO;
  let entitledFullService: EntitledFullService;
  let proratedDateCurrentMonthService: ProratedDateCurrentMonthService;
  let proratedDateEndYearService: ProratedDateEndYearService;
  let userInfoModel: UserInfoModel;
  let serviceYearCalc: ServiceYearCalc;
  beforeEach(async () => {
    const applyLeaveDTOStub = {
      data: { length: {}, startDate: {}, endDate: {}, dayType: {} }
    };
    const dateCalculationServiceStub = {
      getLeaveDuration: (arg1, arg2, arg3, arg4, arg5) => ({})
    };
    const leaveTypePropertiesXmlDTOStub = {
      leaveEntitlementType: { toUpperCase: () => ('PRORATED FROM DATE-OF-CONFIRM TO CURRENT MONTH') },
      excludeDayType: { isExcludeHoliday: {}, isExcludeRestDay: {} }
    };
    const entitledFullServiceStub = {
      calculateEntitledLeave: (arg1, serviceYear2, policy3) => ({})
    };
    const proratedDateCurrentMonthServiceStub = {
      calculateEntitledLeave: (arg1, serviceYear2, policy3) => ({})
    };
    const proratedDateEndYearServiceStub = {
      calculateEntitledLeave: (arg1, serviceYear2, policy3) => ({})
    };
    const userInfoModelStub = {
      USER_GUID: {},
      JOIN_DATE: {},
      CONFIRMATION_DATE: {}
    };
    const serviceYearCalcStub = { calculateEmployeeServiceYear: arg1 => ({}) };
    const xMLParserServiceStub = {
      convertXMLToJson: arg1 => ({
        excludeDayType: { isExcludeHoliday: {}, isExcludeRestDay: {} },
        includeOtherLeaveType: {}
      })
    };
    const leaveTransactionDbServiceStub = {
      findByFilterV2: (array1, filter2) => ({ pipe: () => ({}) })
    };
    const module = await Test.createTestingModule({
      providers: [
        LeaveBalanceValidationService,
        { provide: ApplyLeaveDTO, useValue: applyLeaveDTOStub },
        {
          provide: DateCalculationService,
          useValue: dateCalculationServiceStub
        },
        {
          provide: LeaveTypePropertiesXmlDTO,
          useValue: leaveTypePropertiesXmlDTOStub
        },
        { provide: EntitledFullService, useValue: entitledFullServiceStub },
        {
          provide: ProratedDateCurrentMonthService,
          useValue: proratedDateCurrentMonthServiceStub
        },
        {
          provide: ProratedDateEndYearService,
          useValue: proratedDateEndYearServiceStub
        },
        { provide: UserInfoModel, useValue: userInfoModelStub },
        { provide: ServiceYearCalc, useValue: serviceYearCalcStub },
        { provide: XMLParserService, useValue: xMLParserServiceStub },
        {
          provide: LeaveTransactionDbService,
          useValue: leaveTransactionDbServiceStub
        },
        LeaveBalanceValidationParentService
      ]
    }).compile();
    service = await module.get<LeaveBalanceValidationService>(LeaveBalanceValidationService);
    leaveTypePropertiesXmlDTO = await module.get<LeaveTypePropertiesXmlDTO>(LeaveTypePropertiesXmlDTO);
    entitledFullService = await module.get<EntitledFullService>(EntitledFullService);
    proratedDateCurrentMonthService = await module.get<ProratedDateCurrentMonthService>(ProratedDateCurrentMonthService);
    proratedDateEndYearService = await module.get<ProratedDateEndYearService>(ProratedDateEndYearService);
    userInfoModel = await module.get<UserInfoModel>(UserInfoModel);
    serviceYearCalc = await module.get<ServiceYearCalc>(ServiceYearCalc);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  // describe('getParentBalance', () => {
  //   it('makes expected calls', () => {
  //     const leaveTypePropertiesXmlDTOStub: LeaveTypePropertiesXmlDTO = leaveTypePropertiesXmlDTO; // Test.get(LeaveTypePropertiesXmlDTO);
  //     const entitledFullServiceStub: EntitledFullService = entitledFullService; //Test.get(EntitledFullService);
  //     const proratedDateCurrentMonthServiceStub: ProratedDateCurrentMonthService = proratedDateCurrentMonthService; // Test.get(ProratedDateCurrentMonthService);
  //     const proratedDateEndYearServiceStub: ProratedDateEndYearService = proratedDateEndYearService; // Test.get(ProratedDateEndYearService);
  //     const userInfoModelStub: UserInfoModel = userInfoModel; // Test.get(UserInfoModel);
  //     const serviceYearCalcStub: ServiceYearCalc = serviceYearCalc; // Test.get(ServiceYearCalc);
  //     spyOn(
  //       entitledFullServiceStub,
  //       'calculateEntitledLeave'
  //     ).and.callThrough();
  //     spyOn(
  //       proratedDateCurrentMonthServiceStub,
  //       'calculateEntitledLeave'
  //     ).and.callThrough();
  //     spyOn(
  //       proratedDateEndYearServiceStub,
  //       'calculateEntitledLeave'
  //     ).and.callThrough();
  //     spyOn(
  //       serviceYearCalcStub,
  //       'calculateEmployeeServiceYear'
  //     ).and.callThrough();
  //     service.getParentBalance(
  //       userInfoModelStub,
  //       leaveTypePropertiesXmlDTOStub
  //     );
  //     // service.getParentBalance(new UserInfoModel,new LeaveTypePropertiesXmlDTO);
  //     expect(entitledFullServiceStub.calculateEntitledLeave).not.toHaveBeenCalled();
  //     expect(
  //       proratedDateCurrentMonthServiceStub.calculateEntitledLeave
  //     ).toHaveBeenCalled();
  //     expect(
  //       proratedDateEndYearServiceStub.calculateEntitledLeave
  //     ).not.toHaveBeenCalled();
  //     expect(
  //       serviceYearCalcStub.calculateEmployeeServiceYear
  //     ).toHaveBeenCalled();
  //   });
  // });
});
