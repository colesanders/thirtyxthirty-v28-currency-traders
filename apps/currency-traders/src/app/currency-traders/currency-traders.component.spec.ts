import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@thirty/material';
import { of } from 'rxjs';

import { CurrencysComponent } from './currencys.component';
import { CurrencysDetailComponent } from './components/currencys-detail/currencys-detail.component';
import { CurrencysListComponent } from './components/currencys-list/currencys-list.component';
import { CurrencysFacade } from '@thirty/core-state';
import { Currency } from '@thirty/api-interfaces';

const mockCurrencysFacade = {
  loadCurrencys: () => of({}),
  mutations$: {
    subscribe: () => of({})
  },
  selectCurrency: (id:string) =>  {
    selectedCurrency.id = id;
  }
}

const selectedCurrency: Currency = {
  id: '',
  name: '',
  description: '',
  color: '',
  favorite: false,
  icon: '',
  amount: 0,
}

const mockCurrency: Currency = {
  id: '0',
  name: 'mock',
  description: '',
  color: '',
  favorite: true,
  icon: '',
  amount: 1,
}

describe('CurrencysComponent', () => {
  let component: CurrencysComponent;
  let fixture: ComponentFixture<CurrencysComponent>;
  let de: DebugElement;
  let currencyFacade: CurrencysFacade

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: CurrencysFacade, useValue: mockCurrencysFacade }
      ],
      declarations: [ 
        CurrencysComponent,
        CurrencysListComponent,
        CurrencysDetailComponent
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencysComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    currencyFacade = de.injector.get(CurrencysFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should select', () => {
    component.select(mockCurrency);
    expect(selectedCurrency).toMatchObject(mockCurrency);
  });


  it('should open detail', () => {
    component.focusDetail();
    expect(component.detailOpen).toBe(true);
  });

  it('should close detail', () => {
    component.focusoutDetail();
    expect(component.detailOpen).toBe(false);
  });

});
