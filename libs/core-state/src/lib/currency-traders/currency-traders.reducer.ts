import { CurrencyTrader, Holding } from '@thirty/api-interfaces';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { Action, createReducer, on } from '@ngrx/store';

import * as CurrencyTradersActions from './currency-traders.actions';

export const CURRENCYTRADERS_FEATURE_KEY = 'currencyTrader';

export interface CurrencyTradersState extends EntityState<CurrencyTrader> {
  selectedId?: string | number; // which CurrencyTraders record has been selected
  loaded: boolean; // has the CurrencyTraders list been loaded
  error?: string | null; // last known error (if any)
  selectedHoldingIndex?: number;
}

export interface CurrencyTradersPartialState {
  readonly [CURRENCYTRADERS_FEATURE_KEY]: CurrencyTradersState;
}

export const currencyTraderAdapter: EntityAdapter<CurrencyTrader> = createEntityAdapter();

export const initialCurrencyTradersState: CurrencyTradersState = currencyTraderAdapter.getInitialState({
  // set initial required properties
  loaded: false
});

const _currencyTradersReducer = createReducer(
  initialCurrencyTradersState,
  on(CurrencyTradersActions.resetCurrencyTraders, state => currencyTraderAdapter.removeAll(state)),
  on(CurrencyTradersActions.resetSelectedCurrencyTrader, state => Object.assign({}, state, { selectedId: null })),
  on(CurrencyTradersActions.selectCurrencyTrader, (state, { selectedId }) =>
    Object.assign({}, state, { selectedId })
  ),
  on(CurrencyTradersActions.selectHolding, (state, { selectedHoldingIndex }) =>
    Object.assign({}, state, { selectedHoldingIndex })
  ),
  // Load currencytraders
  on(
    CurrencyTradersActions.loadCurrencyTradersSuccess,
    (state, { currencyTraders }) =>
    currencyTraderAdapter.setAll(currencyTraders, { ...state, loaded: true })
  ),
  // Load currencytrader
  on(
    CurrencyTradersActions.loadCurrencyTraderSuccess,
    (state, { currencyTrader }) =>
    currencyTraderAdapter.upsertOne(currencyTrader, { ...state, loaded: true })
  ),
  // Add currencytrader
  on(CurrencyTradersActions.createCurrencyTraderSuccess,
    (state, { currencyTrader }) =>
    currencyTraderAdapter.addOne(currencyTrader, state)
  ),
  // Update currencytrader
  on(CurrencyTradersActions.updateCurrencyTraderSuccess,
    (state, { currencyTrader }) =>
    currencyTraderAdapter.updateOne({ id: currencyTrader.id, changes: currencyTrader }, state)
  ),
  // Delete currencytrader
  on(CurrencyTradersActions.deleteCurrencyTraderSuccess,
    (state, { currencyTrader }) =>
    currencyTraderAdapter.removeOne(currencyTrader.id, state)
  ),

  // failure actions
  on(
    CurrencyTradersActions.deleteCurrencyTraderFailure,
    CurrencyTradersActions.updateCurrencyTraderFailure,
    CurrencyTradersActions.createCurrencyTraderFailure,
    CurrencyTradersActions.loadCurrencyTraderFailure,
    CurrencyTradersActions.loadCurrencyTradersFailure,
    (state, { error }) => ({
      ...state,
      error
    })
  ),

  // load actions
  on(
    CurrencyTradersActions.loadCurrencyTrader,
    CurrencyTradersActions.loadCurrencyTraders,
    (state) => ({
      ...state,
      loaded: false,
      error: null
    })
  )
);

export function currencyTradersReducer(state: CurrencyTradersState | undefined, action: Action) {
  return _currencyTradersReducer(state, action);
}