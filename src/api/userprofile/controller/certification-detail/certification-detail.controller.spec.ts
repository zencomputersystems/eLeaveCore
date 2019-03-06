import { Test, TestingModule } from '@nestjs/testing';
import { CertificationDetailController } from './certification-detail.controller';

describe('CertificationDetail Controller', () => {
  let controller: CertificationDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CertificationDetailController],
    }).compile();

    controller = module.get<CertificationDetailController>(CertificationDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
