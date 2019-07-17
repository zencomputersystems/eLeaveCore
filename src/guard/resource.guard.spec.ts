import { Test } from '@nestjs/testing';
// import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ResourceGuard } from './resource.guard';
import { ExecutionContext } from '@nestjs/common';
describe('ResourceGuard', () => {
  let service: ResourceGuard;
  let reflector: Reflector;
  let executionContext: ExecutionContext;
  beforeEach(async () => {
    const executionContextStub = {
      getHandler: () => ({}),
      switchToHttp: () => ({
        getRequest: () => ({ user: {}, accessLevel: {} })
      })
    };
    const reflectorStub = { get: (string1, arg2) => ({}) };
    const module = await Test.createTestingModule({
      providers: [
        ResourceGuard,
        // { provide: ExecutionContext, useValue: executionContextStub },
        { provide: Reflector, useValue: reflectorStub }
      ]
    }).compile();
    service = await module.get<ResourceGuard>(ResourceGuard);
    reflector = await module.get<Reflector>(Reflector);
    // executionContext = await module.get<ExecutionContext>(ExecutionContext);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
  // describe('canActivate', () => {
  //   it('makes expected calls', () => {
  //     const executionContextStub: ExecutionContext = executionContext; // Test.get(ExecutionContext);
  //     const reflectorStub: Reflector = reflector; // Test.get(Reflector);
  //     // spyOn(executionContextStub, 'getHandler').and.callThrough();
  //     // spyOn(executionContextStub, 'switchToHttp').and.callThrough();
  //     spyOn(reflectorStub, 'get').and.callThrough();
  //     service.canActivate(executionContextStub);
  //     // expect(executionContextStub.getHandler).toHaveBeenCalled();
  //     // expect(executionContextStub.switchToHttp).toHaveBeenCalled();
  //     expect(reflectorStub.get).toHaveBeenCalled();
  //   });
  // });
});
