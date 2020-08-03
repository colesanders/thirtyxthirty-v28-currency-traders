import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as CurrencyTradersSelectors from '../currency-traders/currency-traders.selectors';
import { CurrencysFacade } from './currencys.facade'
import {
  CURRENCYS_FEATURE_KEY,
  CurrencysState,
  CurrencysPartialState,
  currencyAdapter
} from './currencys.reducer';
import { Holding, Currency } from '@thirty/api-interfaces';

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

export const getSelectedHoldingId = createSelector(
  getCurrencysState,
  (state: CurrencysState) => state.selectedHoldingId
);

export const getSelectedHolding = createSelector(
  getCurrencysEntities,
  getSelectedHoldingId,
  (entities, selectedHoldingId) => selectedHoldingId && entities[selectedHoldingId]
);

export const getConversionRate = createSelector(
  getCurrencysState,
  (state: CurrencysState) => state.conversionRate
);

export const getCurrencyCodes = createSelector(
  getSelectedCurrency,
  CurrencyTradersSelectors.getSelectedHolding,
  (currency: Currency, holding: Holding) => {
    
    if(currency && holding){
      const currencyCodes = {
        from: holding.currency,
        to: currency.code
      }
      return currencyCodes;
    }else{
      return undefined;
    }

    
  }
);

// export const getConversionRateAsync = createSelector(
//   getSelectedCurrency,
//   CurrencyTradersSelectors.getSelectedHolding,
//   (currency: Currency, holding: Holding) => {
//     // TODO: have conversion rate automatically update
//     return 1;
//   }
// );

