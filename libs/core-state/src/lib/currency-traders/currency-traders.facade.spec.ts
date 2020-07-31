import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { CurrencyTradersEntity } from './currency-traders.models';
import { CurrencyTradersEffects } from './currency-traders.effects';
import { CurrencyTradersFacade } from './currency-traders.facade';

import * as CurrencyTradersSelectors from './currency-traders.selectors';
import * as CurrencyTradersActions from './currency-traders.actions';
import {
  CURRENCYTRADERS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './currency-traders.reducer';

interface TestSchema {
  currencyTraders: State;
}

describe('CurrencyTradersFacade', () => {
  let facade: CurrencyTradersFacade;
  let store: Store<TestSchema>;
  const createCurrencyTradersEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CurrencyTradersEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(CURRENCYTRADERS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([CurrencyTradersEffects]),
        ],
        providers: [CurrencyTradersFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(CurrencyTradersFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allCurrencyTraders$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(CurrencyTradersActions.loadCurrencyTraders());

        list = await readFirst(facade.allCurrencyTraders$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadCurrencyTradersSuccess` to manually update list
     */
    it('allCurrencyTraders$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allCurrencyTraders$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          CurrencyTradersActions.loadCurrencyTradersSuccess({
            currencyTraders: [
              createCurrencyTradersEntity('AAA'),
              createCurrencyTradersEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.allCurrencyTraders$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
