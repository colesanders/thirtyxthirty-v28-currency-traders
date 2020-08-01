import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Currency, BPIApiObj } from '@thirty/api-interfaces';
import { Observable } from 'rxjs';

export const BASE_URL = 'https://api.coindesk.com/v1/bpi/currentprice';
export const CONVERSION_URL = 'https://api.exchangeratesapi.io/latest'


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

  convert(from: string, to: string){
    return this.http.get(CONVERSION_URL + '?symbols=' + to + '&base=' + from);
  }

  byCode(code: string): Observable<BPIApiObj>{
    return this.http.get<BPIApiObj>(BASE_URL + '/' + code + '.json');
  }

  getUrl(id?: string) { 
    return `${BASE_URL}/${id}`
  }
}
