import { Injectable } from '@angular/core';
import { filter, tap } from 'rxjs/operators';
import { select, Store, Action, ActionsSubject } from '@ngrx/store';

import { CurrencyTrader } from '@thirty/api-interfaces';

import * as CurrencyTradersActions from './currency-traders.actions';
import { CurrencysFacade } from '../currencys/currencys.facade';
import * as fromCurrencyTraders from './currency-traders.reducer';
import * as CurrencyTradersSelectors from './currency-traders.selectors';

@Injectable({
  providedIn: 'root'
})
export class CurrencyTradersFacade {
  loaded$ = this.store.pipe(select(CurrencyTradersSelectors.getCurrencyTradersLoaded));
  allCurrencyTraders$ = this.store.pipe(select(CurrencyTradersSelectors.getAllCurrencyTraders));
  selectedCurrencyTrader$ = this.store.pipe(select(CurrencyTradersSelectors.getSelectedCurrencyTrader));

  mutations$ = this.actions$.pipe(
    filter((action: Action) =>
    action.type === CurrencyTradersActions.createCurrencyTrader({} as any).type ||
    action.type === CurrencyTradersActions.updateCurrencyTrader({} as any).type ||
    action.type === CurrencyTradersActions.deleteCurrencyTrader({} as any).type
    )
  );

  constructor(
    private store: Store,
    private actions$: ActionsSubject,
    private currencysFacade: CurrencysFacade) { }

  selectCurrencyTrader(currencyTrader: CurrencyTrader) {
    this.dispatch(CurrencyTradersActions.selectCurrencyTrader({ selectedId: currencyTrader.id }));
  }

  selectCurrencyTraderById(selectedId: string) {
    this.dispatch(CurrencyTradersActions.selectCurrencyTrader({ selectedId }));
    this.loadCurrencyTrader(selectedId);
  }

  resetSelectedCurrencyTrader(){
    this.dispatch(CurrencyTradersActions.resetSelectedCurrencyTrader());
  }

  loadCurrencyTraders() {
    this.dispatch(CurrencyTradersActions.loadCurrencyTraders());
  }

  loadCurrencyTrader(currencyTraderId: string) {
    this.dispatch(CurrencyTradersActions.loadCurrencyTrader({ currencyTraderId }));
  }

  createCurrencyTrader(currencyTrader: CurrencyTrader) {
    this.dispatch(CurrencyTradersActions.createCurrencyTrader({ currencyTrader }));
  }

  updateCurrencyTrader(currencyTrader: CurrencyTrader) {
    this.dispatch(CurrencyTradersActions.updateCurrencyTrader({ currencyTrader }));
  }

  deleteCurrencyTrader(currencyTrader: CurrencyTrader) {
    this.dispatch(CurrencyTradersActions.deleteCurrencyTrader({ currencyTrader }));
  }

  dispatch(action: Action) {
    this.store.dispatch(action);
  }
}
