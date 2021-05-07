import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { coinPairs } from '../models/coinPairs';
import coinPairs from 'src/assets/coinPairs.json';


@Injectable({
  providedIn: 'root'
})

export class BinanceServiceService {
  coinPairsList:string[]=[]
  webSocket:WebSocket
  prices = new Map<string, number>();

  constructor(
    private httpclient:HttpClient
  ) {}

  getCoinPairs(){
    this.coinPairsList=[]
    coinPairs.forEach(element => {
      this.coinPairsList.push(element.symbol)
    });
    return this.coinPairsList
  }

  openWebSocket(coinsymbol:string){
    this.webSocket = new WebSocket("wss://stream.binance.com:9443/ws/"+coinsymbol.toLowerCase()+"@miniTicker");
    
    this.webSocket.onopen = (event)=>{
    }

    this.webSocket.onmessage = (event)=>{
      let stringPrice = JSON.parse(event.data).c
      this.prices.set(coinsymbol, parseFloat(stringPrice))
    }

    this.webSocket.onclose = (event)=>{
    }
  }

  closeWebSocket(){
    this.webSocket.close()
  }

  // async getCoins(){
  
  //   let symbols:coinPairs []=[]
  //   const api = "https://api3.binance.com/api/v3/exchangeInfo"
  //   let r:any = await fetch(api)
  //   r = await r.json()
  //   r.symbols.forEach((element:any, i:number) => {
  //     symbols.push({
  //       item_id:i,
  //       item_text:element.symbol
  //     })
  //   })
  //   return symbols
  // }
  
  

}
