import { Injectable } from '@angular/core';
import { CurrencyTradersService } from '@thirty/core-data';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { map, tap, exhaustMap, merge, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as CurrencyTradersActions from './currency-traders.actions';
import { CurrencyTrader, Currency } from '@thirty/api-interfaces';
import { CurrencysFacade } from '../currencys/currencys.facade';

@Injectable()
export class CurrencyTradersEffects {
  @Effect() loadCurrencyTraders$ = this.actions$.pipe(
    ofType(CurrencyTradersActions.loadCurrencyTraders),
    fetch({
      run: (action) => this.currencyTradersService.all().pipe(
        map((currencyTraders: CurrencyTrader[]) => CurrencyTradersActions.loadCurrencyTradersSuccess({ currencyTraders }))
      ),
      onError: (action, error) => CurrencyTradersActions.loadCurrencyTradersFailure({ error })
    })
  );

  @Effect() loadCurrencyTrader$ = this.actions$.pipe(
    ofType(CurrencyTradersActions.loadCurrencyTrader),
    fetch({
      run: (action) => this.currencyTradersService.byId(action.currencyTraderId).pipe(
        map((currencyTrader: CurrencyTrader) => {
          return CurrencyTradersActions.loadCurrencyTraderSuccess({ currencyTrader })
        })
      ),
      onError: (action, error) => CurrencyTradersActions.loadCurrencyTraderFailure({ error })
    })
  );

  @Effect() createCurrencyTrader$ = this.actions$.pipe(
    ofType(CurrencyTradersActions.createCurrencyTrader),
    pessimisticUpdate({
      run: (action) => this.currencyTradersService.create(action.currencyTrader).pipe(
        map((currencyTrader: CurrencyTrader) => CurrencyTradersActions.createCurrencyTraderSuccess({ currencyTrader }))
      ),
      onError: (action, error) => CurrencyTradersActions.createCurrencyTraderFailure({ error })
    })
  );

  @Effect() updateCurrencyTrader$ = this.actions$.pipe(
    ofType(CurrencyTradersActions.updateCurrencyTrader),
    pessimisticUpdate({
      run: (action) => this.currencyTradersService.update(action.currencyTrader).pipe(
        map((currencyTrader: CurrencyTrader) => 
          CurrencyTradersActions.updateCurrencyTraderSuccess({ currencyTrader }))
      ),
      onError: (action, error) => CurrencyTradersActions.updateCurrencyTraderFailure({ error })
    })
  );

  @Effect() deleteCurrencyTrader$ = this.actions$.pipe(
    ofType(CurrencyTradersActions.deleteCurrencyTrader),
    pessimisticUpdate({
      run: (action) => this.currencyTradersService.delete(action.currencyTrader.id).pipe(
        map((currencyTrader: CurrencyTrader) => CurrencyTradersActions.deleteCurrencyTraderSuccess({ currencyTrader })),
      ),
      onError: (action, error) => CurrencyTradersActions.deleteCurrencyTraderFailure({ error })
    })
  );

  // Effect to refresh the currencytrader after an async operation changes the database
  // Made in order to reduce risk of timing errors between async and sync operations
  @Effect() refreshOnSuccess$ = this.actions$.pipe(
    ofType(
      CurrencyTradersActions.createCurrencyTraderSuccess,
      CurrencyTradersActions.deleteCurrencyTraderSuccess,
      CurrencyTradersActions.updateCurrencyTraderSuccess,
      ),
    fetch({
      run: (action) => CurrencyTradersActions.loadCurrencyTraders(),
      onError: (action, error) => CurrencyTradersActions.loadCurrencyTradersFailure({ error })
    })
  );

  //selects trader to be the one created on createdSuccess
  @Effect() selectOnSuccess$ = this.actions$.pipe(
    ofType(CurrencyTradersActions.createCurrencyTraderSuccess),
    fetch({
      run: (action) => CurrencyTradersActions.selectCurrencyTrader({ selectedId: action.currencyTrader.id }),
      onError: (action, error) => CurrencyTradersActions.loadCurrencyTraderFailure({ error })
    })
  );

  constructor(
    private actions$: Actions,
    private currencyTradersService: CurrencyTradersService,
    private currencysFacade: CurrencysFacade
  ) {}
}