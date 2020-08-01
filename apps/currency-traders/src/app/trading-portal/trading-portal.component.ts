import { Component, OnInit } from '@angular/core';
import { CurrencysFacade, CurrencyTradersFacade } from '@thirty/core-state';
import { Currency, Holding } from '@thirty/api-interfaces';

@Component({
  selector: 'thirty-trading-portal',
  templateUrl: './trading-portal.component.html',
  styleUrls: ['./trading-portal.component.scss']
})
export class TradingPortalComponent implements OnInit {
  currentTrader$ = this.currencyTradersFacade.selectedCurrencyTrader$;
  selectedCurrency$ = this.currencysFacade.selectedCurrency$;
  currentConversionRate$ = this.currencysFacade.currentConversionRate$;
  currencys$ = this.currencysFacade.allCurrencys$;

  selectedHolding: Holding;
  selectedCurrency: Currency;

  constructor(
    private currencysFacade: CurrencysFacade,
    private currencyTradersFacade: CurrencyTradersFacade
  ) { }

  ngOnInit(): void {
    this.currencysFacade.loadCurrencys();
  }

  selectCurrency(currency: Currency){
    this.currencysFacade.selectCurrency(currency.code);
    this.currencysFacade.loadCurrency(currency.code);
    this.selectedCurrency = currency;
    this.getConversion();
  }
  selectHolding(holding: Holding){
    this.selectedHolding = holding;
    this.getConversion();
  }

  getConversion(){
    if(this.selectedHolding && this.selectedCurrency){
      this.currencysFacade.getConversionRate(this.selectedHolding.currency, this.selectedCurrency.code)
    }
  }

}
