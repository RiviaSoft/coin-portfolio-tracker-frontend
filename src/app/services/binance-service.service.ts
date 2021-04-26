import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BinanceServiceService {

  constructor(
    private httpclient:HttpClient
  ) {}

  getCoins(){
    
  }

}
