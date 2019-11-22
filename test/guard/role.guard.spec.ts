import { Test } from '@nestjs/testing';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { RolesGuard } from '../../src/guard/role.guard';
describe('RolesGuard', () => {
  let service: RolesGuard;
  beforeEach(async () => {
    const executionContextStub = {
      getHandler: () => ({}),
      switchToHttp: () => ({
        getRequest: () => ({ user: {}, accessLevel: {} })
      })
    };
    const reflectorStub = {
      get: (string1, arg2) => ({ resourceName: {}, resourceRef: {} })
    };
    const module = await Test.createTestingModule({
      providers: [
        RolesGuard,
        // { provide: ExecutionContext, useValue: executionContextStub },
        { provide: Reflector, useValue: reflectorStub }
      ]
    }).compile();
    service = await module.get<RolesGuard>(RolesGuard);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  // describe('canActivate', () => {
  //   it('makes expected calls', () => {
  //     const executionContextStub: ExecutionContext = Test.get(
  //       ExecutionContext
  //     );
  //     const reflectorStub: Reflector = Test.get(Reflector);
  //     spyOn(component, 'getRole').and.callThrough();
  //     spyOn(executionContextStub, 'getHandler').and.callThrough();
  //     spyOn(executionContextStub, 'switchToHttp').and.callThrough();
  //     spyOn(reflectorStub, 'get').and.callThrough();
  //     service.canActivate(executionContextStub);
  //     expect(service.getRole).toHaveBeenCalled();
  //     expect(executionContextStub.getHandler).toHaveBeenCalled();
  //     expect(executionContextStub.switchToHttp).toHaveBeenCalled();
  //     expect(reflectorStub.get).toHaveBeenCalled();
  //   });
  // });
});
