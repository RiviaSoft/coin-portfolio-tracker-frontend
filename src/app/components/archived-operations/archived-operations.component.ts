import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ArchivedOperationModel } from 'src/app/models/archivedOperationModel';
import { OperationsService } from 'src/app/services/operations.service';
import { PnlService } from 'src/app/services/Pnl.service';

@Component({
  selector: 'app-archived-operations',
  templateUrl: './archived-operations.component.html',
  styleUrls: ['./archived-operations.component.css'],
})
export class ArchivedOperationsComponent implements OnInit {
  archivedOperations: ArchivedOperationModel[];

  constructor(
    private pnlService: PnlService,
    private operationsService: OperationsService,
    private toatrService:ToastrService
  ) {}

  ngOnInit(): void {
    this.getArchivedOperations()
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

  getArchivedOperations(){
    this.operationsService.getArchivedOperations().subscribe(response=>{
      this.archivedOperations=response
    })
  }

  deleteArchivedOperation(archivedOperation:ArchivedOperationModel){
    this.operationsService.deleteArchivedOperation(archivedOperation).subscribe(response =>{
      console.log(response)
      this.toatrService.success("Arşivlenmiş işlem silindi.", "Başarılı")
      this.ngOnInit();
    })
  }
}
