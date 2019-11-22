import { Test } from '@nestjs/testing';
import { AssignerDataService } from '../../../src/common/helper/assigner-data.service';
describe('AssignerDataService', () => {
  let service: AssignerDataService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AssignerDataService
      ]
    }).compile();
    service = await module.get<AssignerDataService>(AssignerDataService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
