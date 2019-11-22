import { Test } from '@nestjs/testing';
import { AppService } from '../src/app.service';
import { AppController } from '../src/app.controller';
describe('AppController', () => {
  let pipe: AppController;
  let appService: AppService;
  beforeEach(async () => {
    const appServiceStub = { getHello: () => ({}) };
    const module = await Test.createTestingModule({
      providers: [
        AppController,
        { provide: AppService, useValue: appServiceStub }
      ]
    }).compile();
    pipe = await module.get<AppController>(AppController);
    appService = await module.get<AppService>(AppService);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
  describe('getHello', () => {
    it('makes expected calls', () => {
      const appServiceStub: AppService = appService; // Test.get(AppService);
      spyOn(appServiceStub, 'getHello').and.callThrough();
      pipe.getHello();
      expect(appServiceStub.getHello).toHaveBeenCalled();
    });
  });
});
