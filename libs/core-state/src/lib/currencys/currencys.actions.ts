import { Currency } from '@thirty/api-interfaces';
import { createAction, props } from '@ngrx/store';

export const resetSelectedCurrency = createAction('[Currencys] Reset Selected Currency');
export const resetCurrencys = createAction('[Currencys] Reset Currencys');

// Select Currency
export const selectCurrency = createAction(
  '[Currencys] Select Currency',
  props<{ selectedId: string }>()
);
// Select Holding Currency
export const selectHoldingCurrency = createAction(
  '[Currencys] Select Holding Currency',
  props<{ selectedHoldingId: string }>()
);

// Currency conversion
export const convertCurrency = createAction(
  '[Currencys] Convert Currency',
  props<{ from: string, to: string }>()
);
// Currency conversion
export const convertCurrencyBTC = createAction(
  '[Currencys] Convert Currency BTC',
  props<{ from: string, to: string }>()
);

export const convertCurrencySuccess = createAction(
  '[Currencys] Convert Currency Success',
  props<{ conversionRate: number }>()
);

export const convertCurrencyFailure = createAction(
  '[Currencys] Convert Currency Failure',
  props<{ error: any }>()
);

// Load Currencys
export const loadCurrencys = createAction('[Currencys] Load Currencys');
export const loadCurrencysSample = createAction('[Currencys] Load Currencys Sample');

export const loadCurrencysSuccess = createAction(
  '[Currencys] Load Currencys Success',
  props<{ currencys: Currency[] }>()
);

export const loadCurrencysFailure = createAction(
  '[Currencys] Load Currencys Failure',
  props<{ error: any }>()
);


// Load Many Currency payload: names[string] -> loaded
export const loadManyCurrencys = createAction(
  '[Currencys] Load Many Currencys',
  props<{ currencyNames: string[] }>()
);


// Load Currency
export const loadCurrency = createAction(
  '[Currencys] Load Currency',
  props<{ currencyId: string }>()
);

export const loadCurrencySuccess = createAction(
  '[Currencys] Load Currency Success',
  props<{ currency: Currency }>()
);

export const loadCurrencyFailure = createAction(
  '[Currencys] Load Currency Failure',
  props<{ error: any }>()
);
