import { Component, OnInit, Input } from '@angular/core';
import { Holding, Currency } from '@thirty/api-interfaces';

@Component({
  selector: 'thirty-outcome',
  templateUrl: './outcome.component.html',
  styleUrls: ['./outcome.component.scss']
})
export class OutcomeComponent implements OnInit {
  @Input() holding: Holding;
  @Input() currency: Currency;
  @Input() conversionRate: number;

  constructor() { }

  ngOnInit(): void {
  }

}
