import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { RecentOperationModel } from 'src/app/models/recentOperationModel';
import { ResultModel } from 'src/app/models/resultModel';
import { OperationsService } from 'src/app/services/operations.service';
import { PnlService } from 'src/app/services/Pnl.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  recentOperations: RecentOperationModel[];

  constructor(
    private pnlService: PnlService,
    private operationsService: OperationsService,
    private toastrService:ToastrService
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
    this.operationsService.getRecentOperations().subscribe((response) => {
      this.recentOperations = response;
    });
  }

  deleteRecentOperation(operation:RecentOperationModel){
    this.operationsService.deleteRecentOperation(operation).subscribe(response=>{
      this.toastrService.success("İşlem silindi.", "Başarılı")
      this.ngOnInit()
    })
  }

  addArchivedOperation(operation:RecentOperationModel){
    this.operationsService.addArchivedOperation(operation).subscribe(response=>{ 
      this.toastrService.success("Coin satıldı.", "Başarılı")
      this.ngOnInit()
      
    })
  }
}
