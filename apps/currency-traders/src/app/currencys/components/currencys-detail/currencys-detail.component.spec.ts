import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencysDetailComponent } from './currencys-detail.component';

describe('CurrencysDetailComponent', () => {
  let component: CurrencysDetailComponent;
  let fixture: ComponentFixture<CurrencysDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencysDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencysDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
