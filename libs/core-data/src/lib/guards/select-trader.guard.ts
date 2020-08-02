import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CurrencyTradersFacade } from '@thirty/core-state';
import { tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SelectTraderGuard implements CanActivate {

  constructor(
    private router: Router,
    private currencyTradersFacade: CurrencyTradersFacade
  ){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.currencyTradersFacade.selectedCurrencyTrader$.pipe(
        map(currTrader => {
          if(currTrader){
            return true;
          }else{
            this.router.navigateByUrl('home');
            return false;
          }
          
          
        })
      )
  }
  
}
