import { Injectable } from '@angular/core';
import { ArchivedOperationModel } from '../models/archivedOperationModel';

@Injectable({
  providedIn: 'root'
})
export class PnlService {

  constructor(
  ) { }
  
  recentPnl = new Map<string, number>();
  archivedPnl:number=0

  profitLoss(amount:number, cost:number, price:number, coinsymbol:string, isArchived:boolean):number{
    let pnl:number = (amount*price)-(amount*cost)
    let pnls:string = pnl.toFixed(2)
    pnl = +pnls
    if(!isArchived){
      this.recentPnl.set(coinsymbol, pnl)
    }else{
      //arşivlenmiş işlemlerin kâr/zararı hesaplanacak
    }
    return pnl
  }

  profitLossPercent(cost:number, price:number):number{
    return this.toFixed(((price-cost)/cost*100), 2)
  }

  totalCostCalculate(amount: number, cost: number): number {
    return this.toFixed((amount * cost), 2)
  }

  totalValueCalculate(amount: number, price: number): number {
    return this.toFixed((amount * price), 2)
  }

  getRecentPnl():number{
    let totalPnl:number = 0
    this.recentPnl.forEach(element => {
      totalPnl += element
    });
    return this.toFixed(totalPnl,2)
  }

  getArchivedPnl(archivedOperations:ArchivedOperationModel[]):number{
    let totalPnl = 0;
    archivedOperations.forEach(element => {
      totalPnl += (element.sellcost - element.buycost)*element.coinamount
    });
    return this.toFixed(totalPnl,2)
  }

  toFixed(int:number, fixed:number){
    let stringValue = int.toFixed(fixed)
    return +stringValue
  }


}
