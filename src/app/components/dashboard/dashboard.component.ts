import { Component, OnInit } from '@angular/core';
import {PnlService} from 'src/app/services/pnl.service'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  toplamMaliyet:number

  constructor(private pnlService:PnlService) { }

  ngOnInit(): void {
  }

  totalCostCalculate(amount:number, cost:number):number{
    return amount*cost
  }

  totalValueCalculate(amount:number, price:number):number{
    return amount*price
  }

  pnlCalculate(amount:number, cost:number, price:number):number {
    return this.pnlService.profitLoss(amount, cost, price)
  }

  pnlCalculatePercent(cost:number, price:number):number {
    return this.pnlService.profitLossPercent(cost, price)
  }
}
