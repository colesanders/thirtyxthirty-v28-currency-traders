import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { FormControl } from '@angular/forms'
import { Currency } from '@thirty/api-interfaces';
import { CurrencysFacade, currencysReducer } from '@thirty/core-state';
import { Observable } from 'rxjs';
import { startWith, map, tap } from 'rxjs/operators';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'thirty-currencys-list',
  templateUrl: './currencys-list.component.html',
  styleUrls: ['./currencys-list.component.scss']
})
export class CurrencysListComponent implements OnInit {
  @Input() currencys: Currency[];
  @Output() selected = new EventEmitter<Currency>();
  @Input() selectedCurrency: Currency;

  myControl = new FormControl();
  filteredCurrency: Observable<Currency[]>;

  pageSize = 3;
  pageSizeOptions: number[] = [3,5,8,10];
  pageIndex = 0;

  sliceStart = 0;
  sliceEnd = this.pageSize;

  constructor(
    private currencysFacade: CurrencysFacade
  ) { }

  ngOnInit(): void {

    this.filteredCurrency = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => typeof value === 'string' ? value : value.code),
      map(code => code ? this._filter(code) : this.currencys.slice())
    );
  }

  search(){
    this.currencysFacade.loadCurrencys();
  }

  private _filter(value: string): Currency[] {
    const filterValue = value.toLowerCase();

    return this.currencys.filter(currency => currency.code.toLowerCase().includes(filterValue));
  }

  updatePageSlice(pageEvent){
    this.pageSize = pageEvent.pageSize

    this.sliceStart = pageEvent.pageIndex * pageEvent.pageSize;
    this.sliceEnd = (pageEvent.pageIndex + 1) * pageEvent.pageSize;

  }

  displayFn(currency: Currency): string {
    return currency && currency.code ? currency.code : '';
  }

  select(currency: Currency){
    this.selected.emit(currency)
  }
}
