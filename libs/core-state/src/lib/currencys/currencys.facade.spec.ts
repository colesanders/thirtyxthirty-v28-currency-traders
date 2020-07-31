import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { CurrencysEntity } from './currencys.models';
import { CurrencysEffects } from './currencys.effects';
import { CurrencysFacade } from './currencys.facade';

import * as CurrencysSelectors from './currencys.selectors';
import * as CurrencysActions from './currencys.actions';
import {
  CURRENCYS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './currencys.reducer';

interface TestSchema {
  currencys: State;
}

describe('CurrencysFacade', () => {
  let facade: CurrencysFacade;
  let store: Store<TestSchema>;
  const createCurrencysEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as CurrencysEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(CURRENCYS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([CurrencysEffects]),
        ],
        providers: [CurrencysFacade],
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
      facade = TestBed.get(CurrencysFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allCurrencys$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(CurrencysActions.loadCurrencys());

        list = await readFirst(facade.allCurrencys$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadCurrencysSuccess` to manually update list
     */
    it('allCurrencys$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allCurrencys$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          CurrencysActions.loadCurrencysSuccess({
            currencys: [
              createCurrencysEntity('AAA'),
              createCurrencysEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.allCurrencys$);
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
