import { createAction, props } from '@ngrx/store';
import { CurrencyTrader, Holding } from '@thirty/api-interfaces';

export const resetSelectedCurrencyTrader = createAction('[CurrencyTraders] Reset Selected CurrencyTrader');
export const resetCurrencyTraders = createAction('[CurrencyTraders] Reset CurrencyTraders');

// Select CurrencyTrader
export const selectCurrencyTrader = createAction(
  '[CurrencyTraders] Select CurrencyTrader',
  props<{ selectedId: string }>()
);
// Select Holding
export const selectHolding = createAction(
  '[CurrencyTraders] Select Holding',
  props<{ selectedHoldingIndex: number }>()
);

// Load CurrencyTraders
export const loadCurrencyTraders = createAction('[CurrencyTraders] Load CurrencyTraders');

export const loadCurrencyTradersSuccess = createAction(
  '[CurrencyTraders] Load CurrencyTraders Success',
  props<{ currencyTraders: CurrencyTrader[] }>()
);

export const loadCurrencyTradersFailure = createAction(
  '[CurrencyTraders] Load CurrencyTraders Failure',
  props<{ error: any }>()
);

// Load CurrencyTrader
export const loadCurrencyTrader = createAction(
  '[CurrencyTraders] Load CurrencyTrader',
  props<{ currencyTraderId: string }>()
);

export const loadCurrencyTraderSuccess = createAction(
  '[CurrencyTraders] Load CurrencyTrader Success',
  props<{ currencyTrader: CurrencyTrader }>()
);

export const loadCurrencyTraderFailure = createAction(
  '[CurrencyTraders] Load CurrencyTrader Failure',
  props<{ error: any }>()
);

// Create CurrencyTrader
export const createCurrencyTrader = createAction(
  '[CurrencyTraders] Create CurrencyTrader',
  props<{ currencyTrader: CurrencyTrader }>()
);

export const createCurrencyTraderSuccess = createAction(
  '[CurrencyTraders] Create CurrencyTrader Success',
  props<{ currencyTrader: CurrencyTrader }>()
);

export const createCurrencyTraderFailure = createAction(
  '[CurrencyTraders] Create CurrencyTrader Failure',
  props<{ error: any }>()
);

// Update CurrencyTrader
export const updateCurrencyTrader = createAction(
  '[CurrencyTraders] Update CurrencyTrader',
  props<{ currencyTrader: CurrencyTrader }>()
);

export const updateCurrencyTraderSuccess = createAction(
  '[CurrencyTraders] Update CurrencyTrader Success',
  props<{ currencyTrader: CurrencyTrader }>()
);

export const updateCurrencyTraderFailure = createAction(
  '[CurrencyTraders] Update CurrencyTrader Failure',
  props<{ error: any }>()
);

// Delete CurrencyTrader
export const deleteCurrencyTrader = createAction(
  '[CurrencyTraders] Delete CurrencyTrader',
  props<{ currencyTrader: CurrencyTrader }>()
);

export const deleteCurrencyTraderCancelled = createAction(
  '[CurrencyTraders] Delete CurrencyTrader Cancelled'
);

export const deleteCurrencyTraderSuccess = createAction(
  '[CurrencyTraders] Delete CurrencyTrader Success',
  props<{ currencyTrader: CurrencyTrader }>()
);

export const deleteCurrencyTraderFailure = createAction(
  '[CurrencyTraders] Delete CurrencyTrader Failure',
  props<{ error: any }>()
);
