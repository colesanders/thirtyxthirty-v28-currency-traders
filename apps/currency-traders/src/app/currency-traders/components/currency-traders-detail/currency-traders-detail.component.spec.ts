import { HttpClientModule } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '@thirty/material';

import { CurrencysDetailComponent } from './currencys-detail.component';

describe('CurrencysDetailComponent', () => {
  let component: CurrencysDetailComponent;
  let fixture: ComponentFixture<CurrencysDetailComponent>;
  let de: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencysDetailComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        MaterialModule,
        NoopAnimationsModule,
        RouterTestingModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencysDetailComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create the formGroup', () => {
    component.createFormGroup();
    expect(component.currencyForm).toBeTruthy();
  });

  it('should reset formGroup', () => {
    component.cancel();
    expect(component.currencyForm.value).toMatchSnapshot();
  });


});
