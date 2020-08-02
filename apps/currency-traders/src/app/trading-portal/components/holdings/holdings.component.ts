import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyTrader,Currency,CurrencyIcons, getCurrencyIcon, Holding } from '@thirty/api-interfaces';

@Component({
  selector: 'thirty-holdings',
  templateUrl: './holdings.component.html',
  styleUrls: ['./holdings.component.scss']
})
export class HoldingsComponent implements OnInit {
  @Input() currencyTrader: CurrencyTrader;
  @Input() currHolding: Holding
  @Output() selectedHolding = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  getCurrencyIcon(curr: string){
    const currIcon = CurrencyIcons[curr];
    return currIcon
  }

  selectHolding(index: number){
    this.selectedHolding.emit(index);
  }

}
