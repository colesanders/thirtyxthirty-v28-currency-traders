import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Currency, BPIApiObj } from '@thirty/api-interfaces';
import { Observable } from 'rxjs';

export const BASE_URL = 'https://api.coindesk.com/v1/bpi/currentprice';


@Injectable({
  providedIn: 'root'
})
export class CurrencysService {

  constructor(private http: HttpClient) { }

  sample(): Observable<BPIApiObj>{
    return this.http.get<BPIApiObj>(BASE_URL + '.json');
  }

  all(){
    return this.http.get('https://openexchangerates.org/api/currencies.json');
  }

  byCode(code: string): Observable<BPIApiObj>{
    return this.http.get<BPIApiObj>(BASE_URL + '/' + code + '.json');
  }

  getUrl(id?: string) { 
    return `${BASE_URL}/${id}`
  }
}
