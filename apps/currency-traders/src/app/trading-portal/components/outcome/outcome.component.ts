import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Holding, Currency } from '@thirty/api-interfaces';

@Component({
  selector: 'thirty-outcome',
  templateUrl: './outcome.component.html',
  styleUrls: ['./outcome.component.scss']
})
export class OutcomeComponent implements OnInit, OnChanges {
  @Input() holding: Holding;
  @Input() currency: Currency;
  @Input() conversionRate: number;
  @Output() newHolding = new EventEmitter();

  convertedAmount: number;

  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges():void {
    if(this.holding && this.conversionRate){
      this.convertedAmount = this.holding.amount * this.conversionRate;
    }
    
  }

  convert(){
    const roundAmount = Math.round(this.convertedAmount * 100)/100

    const convertedHolding: Holding = {
      currency: this.currency.code,
      amount: roundAmount,
    }
    this.newHolding.emit(convertedHolding)
  }


}
