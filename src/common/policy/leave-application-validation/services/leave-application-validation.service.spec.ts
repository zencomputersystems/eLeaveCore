import { Test } from '@nestjs/testing';
import { LeaveTypePropertiesXmlDTO } from 'src/admin/leavetype-entitlement/dto/xml/leavetype-properties.xml.dto';
import { ApplyLeaveDTO } from 'src/api/leave/dto/apply-leave.dto';
import { UserInfoModel } from 'src/admin/user-info/model/user-info.model';
import { DateCalculationService } from 'src/common/calculation/service/date-calculation.service';
import { LeaveBalanceValidationService } from './leave-balance-validation.service';
import { LeaveTransactionDbService } from 'src/api/leave/db/leave-transaction.db.service';
import { LeaveApplicationValidationService } from './leave-application-validation.service';
describe('LeaveApplicationValidationService', () => {
  let service: LeaveApplicationValidationService;
  beforeEach(async () => {
    const leaveTypePropertiesXmlDTOStub = {
      applyBeforeProperties: {
        numberOfDays: {},
        isAllowShortNotice: { isCheck: {} },
        excludeDayType: { isExcludeHoliday: {}, isExcludeRestDay: {} }
      },
      applyWithinProperties: {
        numberOfDays: {},
        isAllowBackdated: { isCheck: {} },
        excludeDayType: { isExcludeHoliday: {}, isExcludeRestDay: {} }
      },
      maxDayPerLeave: {},
      applyInAdvance: {},
      applyNextYear: {},
      excludeDayType: { isExcludeHoliday: {}, isExcludeRestDay: {} },
      isAllowAfterJoinDate: {}
    };
    const applyLeaveDTOStub = {
      data: { startDate: {}, endDate: {}, length: {} }
    };
    const userInfoModelStub = { CONFIRMATION_DATE: {}, USER_GUID: {} };
    const dateCalculationServiceStub = {
      getDayDuration: (currentDate1, startDate2, arg3, arg4) => ({}),
      getLeaveDuration: (arg1, arg2, arg3, arg4, arg5) => ({})
    };
    const leaveBalanceValidationServiceStub = {
      validateLeaveBalance: (
        userInfo1,
        applyLeaveDTO2,
        userEntitlement3
      ) => ({})
    };
    const leaveTransactionDbServiceStub = {
      findByFilterV2: (array1, filter2) => ({ pipe: () => ({}) })
    };
    const module = await Test.createTestingModule({
      providers: [
        LeaveApplicationValidationService,
        {
          provide: LeaveTypePropertiesXmlDTO,
          useValue: leaveTypePropertiesXmlDTOStub
        },
        { provide: ApplyLeaveDTO, useValue: applyLeaveDTOStub },
        { provide: UserInfoModel, useValue: userInfoModelStub },
        {
          provide: DateCalculationService,
          useValue: dateCalculationServiceStub
        },
        {
          provide: LeaveBalanceValidationService,
          useValue: leaveBalanceValidationServiceStub
        },
        {
          provide: LeaveTransactionDbService,
          useValue: leaveTransactionDbServiceStub
        }
      ]
    }).compile();
    // service = Test.get(LeaveApplicationValidationService);
    service = await module.get<LeaveApplicationValidationService>(LeaveApplicationValidationService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
