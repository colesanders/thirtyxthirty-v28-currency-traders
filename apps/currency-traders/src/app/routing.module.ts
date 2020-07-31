import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CurrencysComponent } from './currencys/currencys.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { UiLoginModule } from '@thirty/ui-login';
import { LoginComponent } from '@thirty/ui-login';
import { CurrencyTradersOverviewComponent } from './currency-traders/components/currency-traders-overview/currency-traders-overview.component';

import { LoginGuard } from '@thirty/ui-login';
import { CurrencyTradersComponent } from './currency-traders/currency-traders.component';
import { CurrencysOverviewComponent } from './currencys/components/currencys-overview/currencys-overview.component';

const routes: Routes = [
  { path: 'currency-traders', component: CurrencyTradersComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: ':id', // child route path
        component: CurrencyTradersOverviewComponent // child route component that the router renders
      }
    ]
  },
  { path: 'currencys', component: CurrencysComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: ':code', // child route path
        component: CurrencysOverviewComponent // child route component that the router renders
      }
    ]
  },
  { path: 'login', component: LoginComponent},
  { path: '404', component: FourOhFourComponent},
  { path: '', redirectTo: '/currencys', pathMatch: 'full'},
  { path: '**', component: FourOhFourComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UiLoginModule,
      RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
