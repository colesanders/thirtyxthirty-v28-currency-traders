import { Component, OnInit } from '@angular/core';
import { CurrencyTradersFacade } from '@thirty/core-state';
import { CreateTraderComponent } from './components/create-trader/create-trader.component';
import { MatDialog } from '@angular/material/dialog';
import { CurrencyTrader } from '@thirty/api-interfaces';
import { Router } from '@angular/router';

@Component({
  selector: 'thirty-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currencyTraders$ = this.currencyTradersFacade.allCurrencyTraders$;
  currencyTrader$ = this.currencyTradersFacade.selectedCurrencyTrader$;

  constructor(
    private currencyTradersFacade: CurrencyTradersFacade,
    public dialog: MatDialog,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.currencyTradersFacade.loadCurrencyTraders();
  }


  select(trader: CurrencyTrader){
    this.currencyTradersFacade.selectCurrencyTrader(trader);
  }
  delete(trader: CurrencyTrader){
    this.currencyTradersFacade.deleteCurrencyTrader(trader);
  }

  selectTrader(){
    this.router.navigate(['/trading-portal']);
  }

  createTrader(){
    this.currencyTradersFacade.loadCurrencyTraders();

    const dialogRef = this.dialog.open(CreateTraderComponent, {
      data: {currencyTraders$: this.currencyTraders$}
    });

    dialogRef.afterClosed().subscribe(result => {

      if(result){
        const trader: CurrencyTrader = {...result}
        this.currencyTradersFacade.createCurrencyTrader(trader);
        
      }

    });
  }
  

}
