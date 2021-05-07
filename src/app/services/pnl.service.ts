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

  totalCostCalculate(amount: number, cost: number): number {
    let totalCost:number= amount * cost;
    let totalCosts:string = totalCost.toFixed(2)
    totalCost = +totalCosts
    return totalCost
  }

}
