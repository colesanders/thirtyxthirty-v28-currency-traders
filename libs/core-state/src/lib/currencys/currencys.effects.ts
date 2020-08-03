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
        map((conversionApiObj: ConversionApiObj) => {
          const currencys: Currency[] = [];
          const values = Object.values(conversionApiObj.rates)
          Object.keys(conversionApiObj.rates).forEach((code, i) => {
            const currency: Currency = {
              id: code,
              code: code,
              rate_float: values[i],
            }
            currencys.push(currency);
          })
          const BTC: Currency = {
            id: "BTC",
            code: "BTC",
            description: "bitcoin"
          }
          const EUR: Currency = {
            id: conversionApiObj.base,
            code: conversionApiObj.base,
          }
          currencys.push(BTC,EUR)

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
          const BTC: Currency = {
            id: "BTC",
            code: "BTC",
            description: "bitcoin"
          }
          currencys.push(BTC)

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

  @Effect() convertCurrencyBTC$ = this.actions$.pipe(
    ofType(CurrencysActions.convertCurrencyBTC),
    fetch({
      run: (action) => {
        if(action.to.includes('BTC')){
          return this.currencysService.byCode(action.from).pipe(
            map((bpiApiObj: BPIApiObj)=>{
              const currBPI: BPI = bpiApiObj.bpi
              const currencys: Currency[] = Object.values(currBPI);
              const currency: Currency = currencys.find((curr)=> curr.code.includes(action.from))
              return CurrencysActions.convertCurrencySuccess({ conversionRate: (1/currency.rate_float) })
            })
          )
        }else{
          return this.currencysService.byCode(action.to).pipe(
            map((bpiApiObj: BPIApiObj)=>{
              const currBPI: BPI = bpiApiObj.bpi
              const currencys: Currency[] = Object.values(currBPI);
              const currency: Currency = currencys.find((curr)=> curr.code.includes(action.to))
              return CurrencysActions.convertCurrencySuccess({ conversionRate: currency.rate_float })
            })
          )
        }


      },
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