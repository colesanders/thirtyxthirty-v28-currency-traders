import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { CurrencysEffects } from './currencys.effects';
import * as CurrencysActions from './currencys.actions';

describe('CurrencysEffects', () => {
  let actions: Observable<any>;
  let effects: CurrencysEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NxModule.forRoot()],
      providers: [
        CurrencysEffects,
        DataPersistence,
        provideMockActions(() => actions),
        provideMockStore(),
      ],
    });

    effects = TestBed.get(CurrencysEffects);
  });

  describe('loadCurrencys$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: CurrencysActions.loadCurrencys() });

      const expected = hot('-a-|', {
        a: CurrencysActions.loadCurrencysSuccess({ currencys: [] }),
      });

      expect(effects.loadCurrencys$).toBeObservable(expected);
    });
  });
});
