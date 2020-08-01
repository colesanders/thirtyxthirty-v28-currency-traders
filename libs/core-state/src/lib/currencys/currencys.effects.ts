import { Injectable } from '@angular/core';
import { CurrencysService } from '@thirty/core-data';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { fetch, pessimisticUpdate } from '@nrwl/angular';
import { map, tap, exhaust, exhaustMap, catchError } from 'rxjs/operators';
import * as CurrencysActions from './currencys.actions';
import { Currency, BPIApiObj, BPI, ConversionApiObj} from '@thirty/api-interfaces';
import { merge, of } from 'rxjs';

@Injectable()
export class CurrencysEffects {
  @Effect() loadCurrencys$ = this.actions$.pipe(
    ofType(CurrencysActions.loadCurrencys),
    fetch({
      run: (action) => this.currencysService.all().pipe(
        map((largeCurrencyObj) => {
          const currencys: Currency[] = [];
          const descriptions = Object.values(largeCurrencyObj)
          Object.keys(largeCurrencyObj).forEach((code, i) => {
            const currency: Currency = {
              id: code,
              code: code,
              description: descriptions[i]
            }
            currencys.push(currency);
          })

          return CurrencysActions.loadCurrencysSuccess({ currencys })
        })
      ),
      onError: (action, error) => CurrencysActions.loadCurrencysFailure({ error })
    })
  );

  @Effect() loadCurrencysSample$ = this.actions$.pipe(
    ofType(CurrencysActions.loadCurrencysSample),
    fetch({
      run: (action) => this.currencysService.sample().pipe(
        map((bpiApiObj: BPIApiObj) => {
          const currBPI: BPI = bpiApiObj.bpi
          const currencys: Currency[] = Object.values(currBPI);

          return CurrencysActions.loadCurrencysSuccess({ currencys })
        })
      ),
      onError: (action, error) => CurrencysActions.loadCurrencysFailure({ error })
    })
  );

  @Effect() loadCurrency$ = this.actions$.pipe(
    ofType(CurrencysActions.loadCurrency),
    fetch({
      run: (action) => this.currencysService.byCode(action.currencyId).pipe(
        map((bpiApiObj: BPIApiObj) => {
          const currBPI: BPI = bpiApiObj.bpi
          const currencys: Currency[] = Object.values(currBPI);
          const currency: Currency = currencys.find((curr)=> curr.code.includes(action.currencyId))
          return CurrencysActions.loadCurrencySuccess({ currency })
        })
      ),
      onError: (action, error) => CurrencysActions.loadCurrencyFailure({ error })
    })
  );

  @Effect() convertCurrency$ = this.actions$.pipe(
    ofType(CurrencysActions.convertCurrency),
    fetch({
      run: (action) => this.currencysService.convert(action.from, action.to).pipe(
        map((conversionApiObj: ConversionApiObj) => {
          const conversionRate: number = Object.values(conversionApiObj.rates)[0];

          return CurrencysActions.convertCurrencySuccess({ conversionRate: conversionRate })
        })
      ),
      onError: (action, error) => CurrencysActions.convertCurrencyFailure({ error })
    })
  );

  // Effect to refresh the currency after an async operation changes the database
  // Made in order to reduce risk of timing errors between async and sync operations
  // @Effect() refreshOnSucces = this.actions$.pipe(
  //   ofType(CurrencysActions.deleteCurrencySuccess, CurrencysActions.updateCurrencySuccess),
  //   tap(action => {
  //     CurrencysActions.loadCurrencys();
  //   })
  // );

  constructor(
    private actions$: Actions,
    private currencysService: CurrencysService
  ) {}
}