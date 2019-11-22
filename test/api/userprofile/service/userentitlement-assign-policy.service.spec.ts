import { UserEntitlementAssignPolicy } from '../../../../src/api/userprofile/service/userentitlement-assign-policy.service';
import { CommonFunctionService } from 'src/common/helper/common-function.services';
import { Test } from '@nestjs/testing';

describe('UserEntitlementAssignPolicy', () => {
  let userEntitlementAssignPolicyService: UserEntitlementAssignPolicy;
  let commonFunctionService: CommonFunctionService;
  beforeEach(async () => {

    const userEntitlementAssignPolicyServiceStub = { findAllPendingLeave: arg1 => ({}) };
    const commonFunctionServiceStub = { getListData: arg1 => ({}) };
    const module = await Test.createTestingModule({
      providers: [
        { provide: UserEntitlementAssignPolicy, useValue: userEntitlementAssignPolicyServiceStub },
        { provide: CommonFunctionService, useValue: commonFunctionServiceStub }
      ]
    }).compile();
    userEntitlementAssignPolicyService = await module.get<UserEntitlementAssignPolicy>(UserEntitlementAssignPolicy);
    commonFunctionService = await module.get<CommonFunctionService>(CommonFunctionService);
  });
  it('can load instance', () => {
    expect(userEntitlementAssignPolicyService).toBeTruthy();
  });

});