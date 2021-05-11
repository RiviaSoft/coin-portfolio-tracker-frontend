import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PnlService {

  constructor() { }
  
  recentPnl = new Map<string, number>();
  archivedPnl = new Map<string, number>();


  profitLoss(amount:number, cost:number, price:number, coinsymbol:string, isArchived:boolean):number{
    let pnl:number = (amount*price)-(amount*cost)
    let pnls:string = pnl.toFixed(2)
    pnl = +pnls
    if(!isArchived){
      this.recentPnl.set(coinsymbol, pnl)
    }else{
      this.archivedPnl.set(coinsymbol, pnl)
    }
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

  getRecentPnl():number{
    return this.getTotalPnl(this.recentPnl)
  }

  getArchivedPnl():number{
    return this.getTotalPnl(this.archivedPnl)
  }

  getTotalPnl(map:Map<string, number>){
    let totalPnl:number = 0
    map.forEach(element => {
      totalPnl += element
    });
    let stringValue = totalPnl.toFixed(2);
    totalPnl = +stringValue
    return totalPnl
  }

}
