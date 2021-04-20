import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ListResultModel } from 'src/app/models/dataResultModel';
import { RecentOperationModel } from 'src/app/models/recentOperationModel';
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
  
  recentOperations:ListResultModel<RecentOperationModel>

  constructor(
    private httpClient: HttpClient,
    private pnlService: PnlService,
    private operationsService: OperationsService
  ) {}


  ngOnInit(): void {
    this.getRecentOperations();
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

  getRecentOperations() {
    this.httpClient
      .get<ListResultModel<RecentOperationModel>>(this.apiUrl + 'operations/getall')
      .subscribe((response) => {
        this.recentOperations=response
        console.log(response);
      });
  }
}
