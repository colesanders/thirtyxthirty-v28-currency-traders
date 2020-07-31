import { Component, OnInit, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrencyTrader, Currency } from '@thirty/api-interfaces';
import { CurrencyTradersFacade } from '@thirty/core-state';
import { MatTable } from '@angular/material/table';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';


import { Sort } from '@angular/material/sort';

@Component({
  selector: 'thirty-currencys-overview',
  templateUrl: './currency-traders-overview.component.html',
  styleUrls: ['./currency-traders-overview.component.scss']
})
export class CurrencyTradersOverviewComponent implements OnInit {
  currencyTrader$: Observable<CurrencyTrader> = this.currencyTradersFacade.selectedCurrencyTrader$;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private currencyTradersFacade: CurrencyTradersFacade
  ) { }

  ngOnInit(): void {
    this.get();
  }


  get(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.currencyTradersFacade.selectCurrencyTraderById(id);
  }

  close(){
    this.currencyTradersFacade.resetSelectedCurrencyTrader();
    this.router.navigate(['/currency-traders']);
  }
}
