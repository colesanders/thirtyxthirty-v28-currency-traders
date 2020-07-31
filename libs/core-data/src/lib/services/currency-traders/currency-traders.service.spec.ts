import { TestBed } from '@angular/core/testing';

import { CurrencyTradersService } from './currency-traders.service';

describe('CurrencyTradersService', () => {
  let service: CurrencyTradersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrencyTradersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
