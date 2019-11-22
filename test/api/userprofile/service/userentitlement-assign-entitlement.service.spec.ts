import { UserEntitlementAssignEntitlement } from '../../../../src/api/userprofile/service/userentitlement-assign-entitlement.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { Test } from '@nestjs/testing';

describe('UserEntitlementAssignEntitlement', () => {
  let userEntitlementAssignEntitlementService: UserEntitlementAssignEntitlement;
  let commonFunctionService: CommonFunctionService;
  beforeEach(async () => {

    const userEntitlementAssignEntitlementServiceStub = { findAllPendingLeave: arg1 => ({}) };
    const commonFunctionServiceStub = { getListData: arg1 => ({}) };
    const module = await Test.createTestingModule({
      providers: [
        { provide: UserEntitlementAssignEntitlement, useValue: userEntitlementAssignEntitlementServiceStub },
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub }
      ]
    }).compile();
    userEntitlementAssignEntitlementService = await module.get<UserEntitlementAssignEntitlement>(UserEntitlementAssignEntitlement);
    commonFunctionService = await module.get<CommonFunctionService>(CommonFunctionService);
  });
  it('can load instance', () => {
    expect(userEntitlementAssignEntitlementService).toBeTruthy();
  });

});