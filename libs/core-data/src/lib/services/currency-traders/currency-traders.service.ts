import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CurrencyTrader } from '@thirty/api-interfaces';
import { Observable } from 'rxjs';

export const BASE_URL = 'https://thirtyxthirty-lessons.herokuapp.com/currencyTraders';

@Injectable({
  providedIn: 'root'
})
export class CurrencyTradersService {

  constructor(private http: HttpClient) { }

  all(): Observable<[CurrencyTrader]>{
    return this.http.get<[CurrencyTrader]>(BASE_URL);
  }

  byId(id): Observable<CurrencyTrader>{
    return this.http.get<CurrencyTrader>(this.getUrl(id));
  }

  create(currencyTrader: CurrencyTrader): Observable<CurrencyTrader>{
    return this.http.post<CurrencyTrader>(BASE_URL, currencyTrader);
  }

  update(currencyTrader: CurrencyTrader): Observable<CurrencyTrader>{
    return this.http.put<CurrencyTrader>(this.getUrl(currencyTrader.id), currencyTrader);
  }

  delete(id): Observable<CurrencyTrader>{
    return this.http.delete<CurrencyTrader>(this.getUrl(id));
  }

  getUrl(id?: string) { 
    return `${BASE_URL}/${id}`
  }
}
