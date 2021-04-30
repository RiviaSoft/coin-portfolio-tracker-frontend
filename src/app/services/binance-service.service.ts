import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { coinPairs } from '../models/coinPairs';
import coins from 'src/assets/coins.json';

@Injectable({
  providedIn: 'root'
})

export class BinanceServiceService {

  constructor(
    private httpclient:HttpClient
  ) {}

  coinPairs:string[]
  getCoinPairs(){
    this.coinPairs = coins
    return this.coinPairs
  }

  async getCoins(){
  
    let symbols:coinPairs []=[]
    const api = "https://api3.binance.com/api/v3/exchangeInfo"
    let r:any = await fetch(api)
    r = await r.json()
    r.symbols.forEach((element:any, i:number) => {
      symbols.push({
        item_id:i,
        item_text:element.symbol
      })
    })
    return symbols
  }
  
  

}
