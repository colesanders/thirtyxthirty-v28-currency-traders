import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CoreStateModule } from '@thirty/core-state';
import { CoreDataModule } from '@thirty/core-data';
import { MaterialModule, RatingComponent, MatChipComponent } from '@thirty/material';
import * as fromCurrencys from '@thirty/core-state';

import { RoutingModule } from './routing.module';
import { AppComponent } from './app.component';

import { CurrencysComponent } from './currencys/currencys.component';
import { CurrencysDetailComponent } from './currencys/components/currencys-detail/currencys-detail.component';
import { CurrencysListComponent } from './currencys/components/currencys-list/currencys-list.component';
import { CurrencysOverviewComponent } from './currencys/components/currencys-overview/currencys-overview.component';

import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';

import { CurrencyTradersComponent } from './currency-traders/currency-traders.component';
import { CurrencyTradersOverviewComponent } from './currency-traders/components/currency-traders-overview/currency-traders-overview.component';
import { CurrencyTradersDetailComponent } from './currency-traders/components/currency-traders-detail/currency-traders-detail.component';
import { CurrencyTradersListComponent } from './currency-traders/components/currency-traders-list/currency-traders-list.component';

@NgModule({
  declarations: [
    AppComponent,
    CurrencyTradersComponent,
    CurrencyTradersDetailComponent,
    CurrencyTradersListComponent,
    CurrencysComponent,
    CurrencyTradersOverviewComponent,
    CurrencysDetailComponent,
    CurrencysListComponent,
    FourOhFourComponent,
    CurrencysComponent,
    RatingComponent,
    MatChipComponent,
    CurrencysOverviewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    CoreStateModule,
    CoreDataModule,
    FormsModule,
    RoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot(fromCurrencys.currencysReducer, {}),
    StoreModule.forRoot(fromCurrencys.currencyTradersReducer, {}),
    EffectsModule.forRoot([fromCurrencys.CurrencysEffects]),
    EffectsModule.forRoot([fromCurrencys.CurrencyTradersEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}


