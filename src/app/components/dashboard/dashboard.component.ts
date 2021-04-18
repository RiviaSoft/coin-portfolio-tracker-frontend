import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  toplamMaliyet:number
  constructor() { }

  ngOnInit(): void {
  }

  totalCostCalculate(amount:number, cost:number):number{
    return amount*cost
  }

  totalValueCalculate(amount:number, price:number):number{
    return amount*price
  }

  profitLoss(amount:number, cost:number, price:number):number{
    let pnl:number = (amount*price)-(amount*cost)
    let pnls:string = pnl.toFixed(2)
    pnl = +pnls
    return pnl
  }

  profitLossPercent(cost:number, price:number):number{
    let pnl:number = (price/cost)*100
    let pnls:string = pnl.toFixed(2)
    pnl = +pnls
    return pnl
  }



}
