import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RecentOperationsModel } from 'src/app/models/recentOperationsModel';
import { OperationsService } from 'src/app/services/operations.service';
import { PnlService } from 'src/app/services/Pnl.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  toplamMaliyet: number;
  apiUrl: string = 'http://127.0.0.1:8000/api/';
  
  recentOperations:RecentOperationsModel[]

  constructor(
    private httpClient: HttpClient,
    private pnlService: PnlService,
    private operationsService: OperationsService
  ) {}


  ngOnInit(): void {
    this.getRecentOperions();
  }

  totalCostCalculate(amount: number, cost: number): number {
    return amount * cost;
  }

  totalValueCalculate(amount: number, price: number): number {
    return amount * price;
  }

  pnlCalculate(amount: number, cost: number, price: number): number {
    return this.pnlService.profitLoss(amount, cost, price);
  }

  pnlCalculatePercent(cost: number, price: number): number {
    return this.pnlService.profitLossPercent(cost, price);
  }

  getRecentOperions() {
    this.httpClient
      .get<RecentOperationsModel[]>(this.apiUrl + 'operations/getall')
      .subscribe((response) => {
        this.recentOperations=response
        console.log(response);
      });
  }
}
