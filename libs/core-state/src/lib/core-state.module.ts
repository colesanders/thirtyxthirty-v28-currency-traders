import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromCurrencyTraders from './currency-traders/currency-traders.reducer';
import { CurrencyTradersEffects } from './currency-traders/currency-traders.effects';
import { CurrencyTradersFacade } from './currency-traders/currency-traders.facade';
import * as fromCurrencys from './currencys/currencys.reducer';
import { CurrencysEffects } from './currencys/currencys.effects';
import { CurrencysFacade } from './currencys/currencys.facade';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature(
      fromCurrencyTraders.CURRENCYTRADERS_FEATURE_KEY,
      fromCurrencyTraders.currencyTradersReducer
    ),
    EffectsModule.forFeature([CurrencyTradersEffects]),
    StoreModule.forFeature(
      fromCurrencys.CURRENCYS_FEATURE_KEY,
      fromCurrencys.currencysReducer
    ),
    EffectsModule.forFeature([CurrencysEffects]),
  ],
  providers: [CurrencyTradersFacade, CurrencysFacade],
})
export class CoreStateModule {}
