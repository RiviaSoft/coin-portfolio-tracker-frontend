import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PnlService {

  constructor() { }

  profitLoss(amount:number, cost:number, price:number):number{
    let pnl:number = (amount*price)-(amount*cost)
    let pnls:string = pnl.toFixed(2)
    pnl = +pnls
    return pnl
  }

  profitLossPercent(cost:number, price:number):number{
    let pnl:number = (price-cost)/cost*100
    let pnls:string = pnl.toFixed(2)
    pnl = +pnls
    return pnl
  }


}
