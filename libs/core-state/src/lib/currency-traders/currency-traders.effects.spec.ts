import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { CurrencyTradersEffects } from './currency-traders.effects';
import * as CurrencyTradersActions from './currency-traders.actions';

describe('CurrencyTradersEffects', () => {
  let actions: Observable<any>;
  let effects: CurrencyTradersEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        CurrencyTradersEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(CurrencyTradersEffects);
  });

  describe('loadCurrencyTraders$', () => {
    it('should work', () => {
      actions = hot('-a-|', {
        a: CurrencyTradersActions.loadCurrencyTraders(),
      });

      const expected = hot('-a-|', {
        a: CurrencyTradersActions.loadCurrencyTradersSuccess({
          currencyTraders: [],
        }),
      });

      expect(effects.loadCurrencyTraders$).toBeObservable(expected);
    });
  });
});
