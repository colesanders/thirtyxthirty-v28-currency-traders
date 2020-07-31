import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

import { CurrencysFacade } from '@thirty/core-state';
import { Currency } from '@thirty/api-interfaces';
@Component({
  selector: 'thirty-stats-overview',
  templateUrl: './currencys-overview.component.html',
  styleUrls: ['./currencys-overview.component.scss']
})
export class CurrencysOverviewComponent implements OnInit {
  currency$: Observable<Currency> = this.currencysFacade.selectedCurrency$;

  constructor(
    private route: ActivatedRoute, 
    private router: Router,
    private currencysFacade: CurrencysFacade,
  ) { }

  ngOnInit(): void {
    this.get()
  }

  get(): void {
    const name = this.route.snapshot.paramMap.get('code');
    this.currencysFacade.selectCurrency(name);
  }

  close(){
    this.router.navigate(['/currencys']);
  }

}
