import { TestBed } from '@angular/core/testing';
import { BranchModule } from './branch.module';
describe('BranchModule', () => {
  let pipe: BranchModule;
  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [BranchModule] });
    pipe = TestBed.get(BranchModule);
  });
  it('can load instance', () => {
    expect(pipe).toBeTruthy();
  });
});
