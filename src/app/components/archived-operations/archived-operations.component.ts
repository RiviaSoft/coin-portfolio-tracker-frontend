import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ArchivedOperationModel } from 'src/app/models/archivedOperationModel';
import { OperationsService } from 'src/app/services/operations.service';
import { PnlService } from 'src/app/services/pnl.service';

@Component({
  selector: 'app-archived-operations',
  templateUrl: './archived-operations.component.html',
  styleUrls: ['./archived-operations.component.css'],
})
export class ArchivedOperationsComponent implements OnInit {
  archivedOperations: ArchivedOperationModel[];
  filterText:string;
  selectedModal:ArchivedOperationModel={coinsymbol:"", coinamount:0, id:0, buycost:0, userid:0,sellcost:0};

  constructor(
    private pnlService: PnlService,
    private operationsService: OperationsService,
    private toatrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.getArchivedOperations()
  }
  setSelectedModal(operation:ArchivedOperationModel){
    this.selectedModal=operation
  }

  totalCostCalculate(amount: number, cost: number): number {
    return this.pnlService.totalCostCalculate(amount, cost)
  }

  totalValueCalculate(amount: number, price: number): number {
    return this.pnlService.totalValueCalculate(amount, price)
  }

  pnlCalculate(amount: number, cost: number, price: number, coinsymbol:string): number {
    return this.pnlService.profitLoss(amount, cost, price, coinsymbol);
  }

  pnlCalculatePercent(cost: number, price: number): number {
    return this.pnlService.profitLossPercent(cost, price);
  }

  getArchivedOperations(){
    this.operationsService.getArchivedOperations().subscribe(response=>{
      this.archivedOperations=response
    })
  }

  deleteArchivedOperation(archivedOperation:ArchivedOperationModel){
    this.operationsService.deleteArchivedOperation(archivedOperation).subscribe(response =>{
      this.toatrService.success("Arşivlenmiş işlem silindi.", "Başarılı")
      this.ngOnInit();
    })
  }

}
