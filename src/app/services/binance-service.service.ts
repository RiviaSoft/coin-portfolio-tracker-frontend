import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import { coinPairs } from '../models/coinPairs';
import coinPairs from 'src/assets/coinPairs.json';


@Injectable({
  providedIn: 'root'
})

export class BinanceServiceService {

  price:number
  webSocket:WebSocket


  constructor(
    private httpclient:HttpClient
  ) {}

  coinPairsList:string[]=[]
  getCoinPairs(){
    coinPairs.forEach(element => {
      this.coinPairsList.push(element.symbol)
    });
    return this.coinPairsList
  }

  openWebSocket(coinsymbol:string){
    this.webSocket = new WebSocket("wss://stream.binance.com:9443/ws/"+coinsymbol.toLowerCase()+"@miniTicker");
    
    this.webSocket.onopen = (event)=>{
      console.log(event)
    }

    this.webSocket.onmessage = (event)=>{
      let stringPrice = JSON.parse(event.data).c
      this.price = +stringPrice
    }

    this.webSocket.onclose = (event)=>{
      console.log(event)
    }
  }

  closeWebSocket(){
    this.webSocket.close()
  }

  // getPrice(){
  //   let socket = new WebSocket("wss://stream.binance.com:9443/ws/btcusdt@miniTicker");
  //   let currentPrice
  //   socket.onopen = function(e) {
  //     socket.onmessage = function(event) {
  //       let miniTicker = JSON.parse(event.data)
  //       currentPrice = miniTicker.c
  //     };
  //   };

  // }

 

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
