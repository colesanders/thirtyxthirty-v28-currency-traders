import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  CURRENCYS_FEATURE_KEY,
  CurrencysState,
  CurrencysPartialState,
  currencyAdapter
} from './currencys.reducer';

// Lookup the 'Currencys' feature state managed by NgRx
export const getCurrencysState = createFeatureSelector<
  CurrencysState
>(CURRENCYS_FEATURE_KEY);

const { selectAll, selectEntities } = currencyAdapter.getSelectors();

export const getCurrencysLoaded = createSelector(
  getCurrencysState,
  (state: CurrencysState) => state.loaded
);

export const getCurrencysError = createSelector(
  getCurrencysState,
  (state: CurrencysState) => state.error
);

export const getAllCurrencys = createSelector(
  getCurrencysState,
  (state: CurrencysState) => selectAll(state)
);

export const getCurrencysEntities = createSelector(
  getCurrencysState,
  (state: CurrencysState) => selectEntities(state)
);

export const getSelectedId = createSelector(
  getCurrencysState,
  (state: CurrencysState) => state.selectedId
);

export const getSelectedCurrency = createSelector(
  getCurrencysEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId]
);