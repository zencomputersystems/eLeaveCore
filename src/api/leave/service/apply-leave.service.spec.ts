import { Test } from '@nestjs/testing';
import { Moment } from 'moment';
import { ApplyLeaveDTO } from '../dto/apply-leave.dto';
import { UserLeaveEntitlementDbService } from 'src/api/userprofile/db/user-leave-entitlement.db.service';
import { XMLParserService } from 'src/common/helper/xml-parser.service';
import { LeaveApplicationValidationService } from 'src/common/policy/leave-application-validation/services/leave-application-validation.service';
import { UserInfoService } from 'src/admin/user-info/user-info.service';
import { LeaveTransactionDbService } from '../db/leave-transaction.db.service';
import { DateCalculationService } from 'src/common/calculation/service/date-calculation.service';
import { ApplyLeaveService } from './apply-leave.service';
describe('ApplyLeaveService', () => {
  let service: ApplyLeaveService;
  beforeEach(async () => {
    const momentStub = { format: string1 => ({}) };
    const applyLeaveDTOStub = {
      data: { length: {}, startDate: {}, endDate: {}, dayType: {} }
    };
    const userLeaveEntitlementDbServiceStub = {
      findByFilterV2: (array1, filter2) => ({ pipe: () => ({}) })
    };
    const xMLParserServiceStub = { convertXMLToJson: arg1 => ({}) };
    const leaveApplicationValidationServiceStub = {
      validateLeave: (policy1, y2, arg3, arg4) => ({ pipe: () => ({}) })
    };
    const userInfoServiceStub = {
      findByFilterV2: (array1, extensionQuery2) => ({ pipe: () => ({}) })
    };
    const leaveTransactionDbServiceStub = {
      create: (arg1, result2, user3, y4, onbehalf5) => ({
        pipe: () => ({ subscribe: () => ({}) })
      })
    };
    const dateCalculationServiceStub = {
      getLeaveDuration: (arg1, arg2, arg3, arg4, arg5) => ({})
    };
    const module = await Test.createTestingModule({
      providers: [
        ApplyLeaveService,
        // { provide: Moment, useValue: momentStub },
        { provide: ApplyLeaveDTO, useValue: applyLeaveDTOStub },
        {
          provide: UserLeaveEntitlementDbService,
          useValue: userLeaveEntitlementDbServiceStub
        },
        { provide: XMLParserService, useValue: xMLParserServiceStub },
        {
          provide: LeaveApplicationValidationService,
          useValue: leaveApplicationValidationServiceStub
        },
        { provide: UserInfoService, useValue: userInfoServiceStub },
        {
          provide: LeaveTransactionDbService,
          useValue: leaveTransactionDbServiceStub
        },
        {
          provide: DateCalculationService,
          useValue: dateCalculationServiceStub
        }
      ]
    }).compile();
    // service = Test.get(ApplyLeaveService);
    service = await module.get<ApplyLeaveService>(ApplyLeaveService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  // describe('getMonths', () => {
  //   it('makes expected calls', () => {
  //     const momentStub: Moment = Test.get(Moment);
  //     spyOn(momentStub, 'format').and.callThrough();
  //     service.getMonths(momentStub, momentStub);
  //     expect(momentStub.format).toHaveBeenCalled();
  //   });
  // });
  // describe('getDays', () => {
  //   it('makes expected calls', () => {
  //     const momentStub: Moment = Test.get(Moment);
  //     spyOn(momentStub, 'format').and.callThrough();
  //     service.getDays(momentStub, momentStub);
  //     expect(momentStub.format).toHaveBeenCalled();
  //   });
  // });
});
