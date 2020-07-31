import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

import { CurrencysFacade } from '@thirty/core-state'
import { Currency } from '@thirty/api-interfaces';
import { SnackBarService } from '@thirty/material';
import { Animations } from '../animations';


@Component({
  selector: 'thirty-currencys',
  templateUrl: './currencys.component.html',
  styleUrls: ['./currencys.component.scss'],
  animations: Animations,
})
export class CurrencysComponent implements OnInit {
  currencys$: Observable<Currency[]> = this.currencyFacade.allCurrencys$;
  currency$: Observable<Currency> = this.currencyFacade.selectedCurrency$;
  detailOpen = false;
  searchTerm;

  constructor(
    private currencyFacade: CurrencysFacade,
    private router: Router,
    private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    //this.currencyFacade.loadCurrencysSample();
    this.currencyFacade.loadCurrencys();
  }

  focusDetail(){
    this.detailOpen = true;
  }

  focusoutDetail(){
    this.detailOpen = false;
  }

  select(currency: Currency): void{
    this.currencyFacade.selectCurrency(currency.code);
    this.currencyFacade.loadCurrency(currency.code);
    this.focusDetail();
  }

  cancel(): void{
    this.focusoutDetail();
    this.router.navigate(['/currencys']);
    this.currencyFacade.resetSelectedCurrency();
  }

}
