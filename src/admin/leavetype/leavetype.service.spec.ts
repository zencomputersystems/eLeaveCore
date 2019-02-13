import { Test, TestingModule } from '@nestjs/testing';
import { LeavetypeService } from './leavetype.service';

describe('LeavetypeService', () => {
  let service: LeavetypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LeavetypeService],
    }).compile();

    service = module.get<LeavetypeService>(LeavetypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
