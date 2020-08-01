import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map,tap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';

import { CurrencyTrader,Currency,CurrencyIcons, getCurrencyIcon } from '@thirty/api-interfaces';
import { CurrencysFacade, CurrencyTradersFacade } from '@thirty/core-state';
import { SnackBarService } from '@thirty/material';



@Component({
  selector: 'thirty-currency-traders-detail',
  templateUrl: './currency-traders-detail.component.html',
  styleUrls: ['./currency-traders-detail.component.scss']
})
export class CurrencyTradersDetailComponent implements OnInit, OnChanges{
  @Input() currencyTrader: CurrencyTrader;
  @Output() saved = new EventEmitter();
  @Output() cancelled = new EventEmitter();
  currencys$: Observable<Currency[]> = this.currencysFacade.allCurrencys$;

  currencyTraderForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private currencysFacade: CurrencysFacade,
    private currencyTradersFacade: CurrencyTradersFacade,
    private snackBarService: SnackBarService) { }

  ngOnInit(): void {
    this.createFormGroup();
  }

  ngOnChanges(){
    if(this.currencyTraderForm && this.currencyTrader){
      this.currencyTraderForm.patchValue(this.currencyTrader)
    } else if(this.currencyTraderForm){
      this.cancel();
    }
  }

  saveTrader(){
    this.saved.emit(this.currencyTraderForm.value);
    
    this.cancel();
  }

  getCurrencyIcon(curr: string){
    const currIcon = CurrencyIcons[curr];
    return currIcon
  }


  cancel(){
    this.currencyTraderForm.reset();
  }

  createFormGroup(){
    this.currencyTraderForm = this.formBuilder.group({
      id: [],
      name: [
        [], 
        [Validators.required,]
      ],
      holdings: [
        []
      ]
    })
  }
}
