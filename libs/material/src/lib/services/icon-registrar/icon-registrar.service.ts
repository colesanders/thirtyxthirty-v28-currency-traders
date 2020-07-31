import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

export const BASE_URL = "/assets/";
export const ICON_LIST = ['bitcoin', 'dollar', 'euro', 'pound-sterling']

@Injectable({
  providedIn: 'root'
})
export class IconRegistrarService {

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) { }

  registerSVGs(): void{
    ICON_LIST.forEach((currency)=>{
      this.matIconRegistry.addSvgIcon(currency, 
        this.domSanitizer.bypassSecurityTrustResourceUrl(BASE_URL + currency + ".svg"));
    })

    
    

  }
}
