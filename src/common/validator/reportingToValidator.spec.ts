import { Test } from '@nestjs/testing';
import { ValidationArguments } from 'class-validator';
import { ReportingToValidator } from './reportingToValidator';
describe('ReportingToValidator', () => {
  let pipe: ReportingToValidator;
  beforeEach(async () => {
    const validationArgumentsStub = { object: {} };
    const module = await Test.createTestingModule({
      providers: [
        ReportingToValidator,
        // { provide: ValidationArguments, useValue: validationArgumentsStub }
      ]
    }).compile();
    pipe = await module.get<ReportingToValidator>(ReportingToValidator);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
