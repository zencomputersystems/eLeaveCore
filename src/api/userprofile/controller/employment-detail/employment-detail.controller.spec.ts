import { Test, TestingModule } from '@nestjs/testing';
import { EmploymentDetailController } from './employment-detail.controller';

describe('EmploymentDetail Controller', () => {
  let controller: EmploymentDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EmploymentDetailController],
    }).compile();

    controller = module.get<EmploymentDetailController>(EmploymentDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
