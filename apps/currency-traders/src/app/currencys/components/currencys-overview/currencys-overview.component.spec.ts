import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencysOverviewComponent } from './currencys-overview.component';

describe('CurrencysOverviewComponent', () => {
  let component: CurrencysOverviewComponent;
  let fixture: ComponentFixture<CurrencysOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencysOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencysOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
