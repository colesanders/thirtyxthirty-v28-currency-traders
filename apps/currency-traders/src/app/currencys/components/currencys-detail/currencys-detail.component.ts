import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Currency,CurrencyIcons, getCurrencyIcon } from '@thirty/api-interfaces';
import { CurrencysFacade } from '@thirty/core-state';
import { SnackBarService } from '@thirty/material';

@Component({
  selector: 'thirty-currencys-detail',
  templateUrl: './currencys-detail.component.html',
  styleUrls: ['./currencys-detail.component.scss']
})
export class CurrencysDetailComponent implements OnInit{
  @Input() currency: Currency;
  @Output() cancelled = new EventEmitter();


  constructor(
    private currencysFacade: CurrencysFacade,
    private snackBarService: SnackBarService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    if(this.currency){
      this.currencysFacade.loadCurrency(this.currency.id)
    }
  }

  getCurrencyIcon(curr: string){
    const currIcon = CurrencyIcons[curr];
    return currIcon
  }

}
