import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { CurrencyTradersOverviewComponent } from './currency-traders/components/currency-traders-overview/currency-traders-overview.component';
import { CurrencysComponent } from './currencys/currencys.component';
import { CurrencyTradersComponent } from './currency-traders/currency-traders.component';
import { CurrencysOverviewComponent } from './currencys/components/currencys-overview/currencys-overview.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { HomeComponent } from './home/home.component';
import { TradingPortalComponent } from './trading-portal/trading-portal.component'
import { SelectTraderGuard } from '@thirty/core-data'

import { UiLoginModule } from '@thirty/ui-login';
import { LoginComponent } from '@thirty/ui-login';
import { LoginGuard } from '@thirty/ui-login';



const routes: Routes = [
  { path: 'currency-traders', component: CurrencyTradersComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: ':id', 
        component: CurrencyTradersOverviewComponent 
      }
    ]
  },
  { path: 'currencys', component: CurrencysComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: ':code', 
        component: CurrencysOverviewComponent 
      }
    ]
  },
  { path: 'home', component: HomeComponent,
    canActivate: [LoginGuard],
  },
  { path: 'trading-portal', component: TradingPortalComponent,
    canActivate: [LoginGuard, SelectTraderGuard],
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
