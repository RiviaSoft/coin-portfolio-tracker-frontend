import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PnlService {

  constructor() { }
  
  pnl = new Map<string, number>();


  profitLoss(amount:number, cost:number, price:number, coinsymbol:string):number{
    let pnl:number = (amount*price)-(amount*cost)
    let pnls:string = pnl.toFixed(2)
    pnl = +pnls
    this.pnl.set(coinsymbol, pnl)
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

  totalValueCalculate(amount: number, price: number): number {
    let stringValue = (amount * price).toFixed(2);
    let totalValue= +stringValue
    return totalValue 
  }

  getTotalPnl():number{
    let totalPnl:number = 0
    this.pnl.forEach(element => {
      totalPnl += element
    });
    let stringValue = totalPnl.toFixed(2);
    totalPnl = +stringValue
    return totalPnl
  }

}
