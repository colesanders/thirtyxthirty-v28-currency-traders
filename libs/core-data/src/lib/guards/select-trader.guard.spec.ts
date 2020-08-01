import { TestBed } from '@angular/core/testing';

import { SelectTraderGuard } from './select-trader.guard';

describe('SelectTraderGuard', () => {
  let guard: SelectTraderGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SelectTraderGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
