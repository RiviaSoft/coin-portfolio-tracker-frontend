import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { RecentOperationModel } from 'src/app/models/recentOperationModel';
import { ResultModel } from 'src/app/models/resultModel';
import { OperationsService } from 'src/app/services/operations.service';
import { PnlService } from 'src/app/services/Pnl.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  recentOperations: RecentOperationModel[];
  
  dropdownList:any = [];
  selectedItems:any = [];
  dropdownSettings:IDropdownSettings

  constructor(
    private pnlService: PnlService,
    private operationsService: OperationsService,
    private toastrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.getRecentOperations();
    
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    }
  }

  onItemSelect(item: any) {
    console.log(item);
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

  getRecentOperationsById(id:number) {
    this.operationsService.getRecentOperationById(id).subscribe((response) =>{
      console.log(response)
    })
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
  
  test(){
    console.log("adam")
  }

}
