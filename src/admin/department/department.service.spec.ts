import { Test } from '@nestjs/testing';
import { DepartmentDbService } from './db/department.db.service';
import { DepartmentService } from './department.service';
describe('DepartmentService', () => {
  let service: DepartmentService;
  beforeEach(async () => {
    const departmentDbServiceStub = {
      findAll: tenantId1 => ({ pipe: () => ({}) })
    };
    const module = await Test.createTestingModule({
      providers: [
        DepartmentService,
        { provide: DepartmentDbService, useValue: departmentDbServiceStub }
      ]
    }).compile();
    service = await module.get<DepartmentService>(DepartmentService);
  });
  it('can load instance', () => {
    expect(service).toBeTruthy();
  });
});
