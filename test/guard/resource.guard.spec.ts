import { Test } from '@nestjs/testing';
import { Reflector } from '@nestjs/core';
import { ResourceGuard } from '../../src/guard/resource.guard';
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
        { provide: Reflector, useValue: reflectorStub }
      ]
    }).compile();
    service = await module.get<ResourceGuard>(ResourceGuard);
    reflector = await module.get<Reflector>(Reflector);

  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });

});
