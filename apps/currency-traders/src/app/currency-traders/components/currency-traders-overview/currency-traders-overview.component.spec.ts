import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MaterialModule } from '@thirty/material';
import { of } from 'rxjs';

import { CurrencysOverviewComponent } from './currencys-overview.component';
import { CurrencysFacade, selectCurrency } from '@thirty/core-state';

const mockCurrencysFacade = {
  loadCurrencys: () => of({}),
  mutations$: {
    subscribe: () => of({})
  },
  selectCurrency: (id:string) => {}
}

describe('CurrencysOverviewComponent', () => {
  let component: CurrencysOverviewComponent;
  let fixture: ComponentFixture<CurrencysOverviewComponent>;
  let de: DebugElement;
  let currencyFacade: CurrencysFacade

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencysOverviewComponent ],
      imports: [
        HttpClientModule,
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
      providers: [
        { provide: CurrencysFacade, useValue: mockCurrencysFacade }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencysOverviewComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    currencyFacade = de.injector.get(CurrencysFacade);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should call facade.select', () => {
  //   component.get()
  //   expect(currencyFacade.selectCurrency).toBeCalled();
  // });

});
