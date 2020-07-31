import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { CurrencyTradersFacade } from '@thirty/core-state'
import { CurrencyTrader } from '@thirty/api-interfaces';
import { SnackBarService } from '@thirty/material';
import { Animations } from '../animations';


@Component({
  selector: 'thirty-currencys',
  templateUrl: './currency-traders.component.html',
  styleUrls: ['./currency-traders.component.scss'],
  animations: Animations,
})
export class CurrencyTradersComponent implements OnInit {
  currencyTraders$: Observable<CurrencyTrader[]> = this.currencyTradersFacade.allCurrencyTraders$;
  currencyTrader$: Observable<CurrencyTrader> = this.currencyTradersFacade.selectedCurrencyTrader$;
  
  traderEdit = true;
  detailOpen = false;

  constructor(
    private currencyTradersFacade: CurrencyTradersFacade,
    private router: Router,
    private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.currencyTradersFacade.loadCurrencyTraders();
    this.currencyTradersFacade.mutations$.subscribe((action: any) => this.refresh(action.type.split(' ')));
  }

  refresh(trigger: string){
    const snackBarMessage = 'Currency Trader ' + trigger[1] + 'd';
    this.snackBarService.openSnackBar(snackBarMessage, 'Okay', 1000);
    this.currencyTradersFacade.loadCurrencyTraders();
  }

  focusDetail(){
    this.detailOpen = true;
  }

  focusoutDetail(){
    this.detailOpen = false;
  }

  select(currencyTrader: CurrencyTrader): void{
    this.currencyTradersFacade.selectCurrencyTrader(currencyTrader);
    this.focusDetail();
  }

  delete(currencyTrader: CurrencyTrader): void{
    this.currencyTradersFacade.deleteCurrencyTrader(currencyTrader);
    this.cancel();
  }

  save(currencyTrader: CurrencyTrader): void{
    if(currencyTrader.id){
      this.currencyTradersFacade.updateCurrencyTrader(currencyTrader);
    }else {
      this.currencyTradersFacade.createCurrencyTrader(currencyTrader);
    }
  }

  cancel(): void{
    this.focusoutDetail();
    this.router.navigate(['/currency-traders']);
    this.currencyTradersFacade.resetSelectedCurrencyTrader();
  }

}
