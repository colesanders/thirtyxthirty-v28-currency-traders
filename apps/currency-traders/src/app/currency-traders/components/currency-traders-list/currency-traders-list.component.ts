import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyTrader } from '@thirty/api-interfaces';

@Component({
  selector: 'thirty-currency-traders-list',
  templateUrl: './currency-traders-list.component.html',
  styleUrls: ['./currency-traders-list.component.scss']
})
export class CurrencyTradersListComponent implements OnInit {
  @Input() currencyTraders: [CurrencyTrader];
  @Input() delete: boolean;

  @Output() selected = new EventEmitter<CurrencyTrader>();
  @Output() deleted = new EventEmitter<CurrencyTrader>();
  constructor() { }

  ngOnInit(): void {
    if(this.delete == null || this.delete === undefined){
      this.delete = true;
    }
  }

}
