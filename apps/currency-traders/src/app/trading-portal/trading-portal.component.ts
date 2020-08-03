import { Component, OnInit, OnChanges } from '@angular/core';
import { CurrencysFacade, CurrencyTradersFacade } from '@thirty/core-state';
import { Currency, Holding, CurrencyTrader } from '@thirty/api-interfaces';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'thirty-trading-portal',
  templateUrl: './trading-portal.component.html',
  styleUrls: ['./trading-portal.component.scss']
})
export class TradingPortalComponent implements OnInit, OnChanges {
  currentTrader$ = this.currencyTradersFacade.selectedCurrencyTrader$;
  holding$ = this.currencyTradersFacade.selectedHolding$;

  currencys$ = this.currencysFacade.allCurrencys$;
  selectedCurrency$ = this.currencysFacade.selectedCurrency$;
  selectedHoldingCurrency$ = this.currencysFacade.selectedHoldingCurrency$;
  currencyCodes$ = this.currencysFacade.currencyCodes$;
  currentConversionRate$ = this.currencysFacade.currentConversionRate$;



  index: number;
  constructor(
    private currencysFacade: CurrencysFacade,
    private currencyTradersFacade: CurrencyTradersFacade
  ) { }

  ngOnInit(): void {
    this.currencysFacade.loadCurrencys();

  }
  ngOnChanges(){

  }

  convertHolding(newHolding: Holding){
    let newTrader: CurrencyTrader;
    this.currentTrader$.subscribe((trader)=> {
      const newHoldings = trader.holdings.map((holding, i)=> {
        if(this.index === i){
          return newHolding
        }
        
        return holding
      })

      newTrader = {...trader, holdings: newHoldings}
      
    })

    this.currencyTradersFacade.updateCurrencyTrader(newTrader);
    this.currencysFacade.resetSelectedCurrency();
  }

  selectCurrency(currency: Currency){
    this.currencysFacade.selectCurrency(currency.code);
    this.currencysFacade.loadCurrency(currency.code);
    this.getConversionRate();
  }
  selectHolding(input){
    this.currencyTradersFacade.selectHolding(input.index);
    this.currencysFacade.selectHoldingCurrency(input.holding.currency)
    this.currencysFacade.loadCurrency(input.holding.currency);
    this.index = input.index;
    this.getConversionRate();
  }

  getConversionRate(){
    let from: string;
    let to: string;
    this.currencyCodes$.subscribe((codes)=> {
      if(codes){
        from = codes.from;
        to = codes.to;
      }
    })
    if(from && to){
      this.currencysFacade.getConversionRate(from, to);
    }
    

  }
}
