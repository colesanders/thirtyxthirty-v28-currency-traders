import { Component, OnInit } from '@angular/core';
import { CurrencysFacade, CurrencyTradersFacade } from '@thirty/core-state';
import { Currency, Holding, CurrencyTrader } from '@thirty/api-interfaces';
import { merge } from 'rxjs';
import { tap } from 'rxjs/operators';


@Component({
  selector: 'thirty-trading-portal',
  templateUrl: './trading-portal.component.html',
  styleUrls: ['./trading-portal.component.scss']
})
export class TradingPortalComponent implements OnInit {
  currentTrader$ = this.currencyTradersFacade.selectedCurrencyTrader$;
  holding$ = this.currencyTradersFacade.selectedHolding$;

  currencys$ = this.currencysFacade.allCurrencys$;
  selectedCurrency$ = this.currencysFacade.selectedCurrency$;
  currencyCodes$ = this.currencysFacade.currencyCodes$;
  currentConversionRate$ = this.currencysFacade.currentConversionRate$;

  bitcoinSelected = false;
  bitcoinCurrency: Currency = {
    id: 'BC',
    code: 'BC'
  }

  index: number;
  constructor(
    private currencysFacade: CurrencysFacade,
    private currencyTradersFacade: CurrencyTradersFacade
  ) { }

  ngOnInit(): void {
    this.currencysFacade.loadCurrencysSample();

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
  selectHolding(index: number){
    this.currencyTradersFacade.selectHolding(index);
    this.index = index;
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
