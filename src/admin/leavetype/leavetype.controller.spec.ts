import { Test, TestingModule } from '@nestjs/testing';
import { LeavetypeController } from './leavetype.controller';

describe('Leavetype Controller', () => {
  let controller: LeavetypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeavetypeController],
    }).compile();

    controller = module.get<LeavetypeController>(LeavetypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
