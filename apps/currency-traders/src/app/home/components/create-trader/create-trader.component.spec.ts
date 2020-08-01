import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTraderComponent } from './create-trader.component';

describe('CreateTraderComponent', () => {
  let component: CreateTraderComponent;
  let fixture: ComponentFixture<CreateTraderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTraderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTraderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
