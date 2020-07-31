import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CURRENCYTRADERS_FEATURE_KEY,
  CurrencyTradersState,
  CurrencyTradersPartialState,
  currencyTraderAdapter
} from './currency-traders.reducer';
import * as CurrencysSelectors from '../currencys/currencys.selectors';
import { CurrencysFacade } from '../currencys/currencys.facade'
import { CurrencyTrader, Currency } from '@thirty/api-interfaces';

// Lookup the 'CurrencyTraders' feature state managed by NgRx
export const getCurrencyTradersState = createFeatureSelector<
  CurrencyTradersPartialState,
  CurrencyTradersState
>(CURRENCYTRADERS_FEATURE_KEY);

const { selectAll, selectEntities } = currencyTraderAdapter.getSelectors();

export const getCurrencyTradersLoaded = createSelector(
  getCurrencyTradersState,
  (state: CurrencyTradersState) => state.loaded
);

export const getCurrencyTradersError = createSelector(
  getCurrencyTradersState,
  (state: CurrencyTradersState) => state.error
);

export const getAllCurrencyTraders = createSelector(
  getCurrencyTradersState,
  (state: CurrencyTradersState) => selectAll(state)
);

export const getCurrencyTradersEntities = createSelector(
  getCurrencyTradersState,
  (state: CurrencyTradersState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getCurrencyTradersState,
  (state: CurrencyTradersState) => state.selectedId
);

export const getSelectedCurrencyTrader = createSelector(
  getCurrencyTradersEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);