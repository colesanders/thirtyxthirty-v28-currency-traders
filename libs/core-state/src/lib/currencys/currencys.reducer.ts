import { Currency } from '@thirty/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as CurrencysActions from './currencys.actions';

export const CURRENCYS_FEATURE_KEY = 'currency';

export interface CurrencysState extends EntityState<Currency> {
  selectedId?: string | number; // which Currencys record has been selected
  selectedHoldingId?: string | number;
  loaded: boolean; // has the Currencys list been loaded
  error?: string | null; // last known error (if any)
  conversionRate?: number;
}

export interface CurrencysPartialState {
  readonly [CURRENCYS_FEATURE_KEY]: CurrencysState;
}

export const currencyAdapter: EntityAdapter<Currency> = createEntityAdapter({
  selectId: currency => currency.code
});

export const initialCurrencysState: CurrencysState = currencyAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const _currencysReducer = createReducer(
  initialCurrencysState,
  on(CurrencysActions.resetCurrencys, state => currencyAdapter.removeAll(state)),
  on(CurrencysActions.resetSelectedCurrency, state => Object.assign({}, state, { selectedId: null })),
  on(CurrencysActions.selectCurrency, (state, { selectedId }) =>
    Object.assign({}, state, { selectedId })
  ),
  on(CurrencysActions.selectHoldingCurrency, (state, { selectedHoldingId }) =>
    Object.assign({}, state, { selectedHoldingId })
  ),
  on(CurrencysActions.convertCurrencySuccess, (state, { conversionRate }) =>
    Object.assign({}, state, { conversionRate })
  ),
  // Load currencys
  on(
    CurrencysActions.loadCurrencysSuccess,
    (state, { currencys }) =>
    currencyAdapter.setAll(currencys, { ...state, loaded: true })
  ),
  // Load currency
  on(
    CurrencysActions.loadCurrencySuccess,
    (state, { currency }) =>
    currencyAdapter.upsertOne(currency, { ...state, loaded: true })
  ),

  // failure actions
  on(
    CurrencysActions.loadCurrencyFailure,
    CurrencysActions.loadCurrencysFailure,
    CurrencysActions.convertCurrencyFailure,
    (state, { error }) => ({
      ...state,
      error
    })
  ),
  // load actions
  on(
    CurrencysActions.loadCurrency,
    CurrencysActions.loadCurrencys,
    (state) => ({
      ...state,
      loaded: false,
      error: null
    })
  )
);

export function currencysReducer(state: CurrencysState | undefined, action: Action) {
  return _currencysReducer(state, action);
}