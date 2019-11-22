import { Test } from '@nestjs/testing';
import { AppService } from '../src/app.service';
describe('AppService', () => {
  let service: AppService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AppService
      ]
    }).compile();
    service = await module.get<AppService>(AppService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
