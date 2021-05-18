import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RecentOperationModel } from 'src/app/models/recentOperationModel';
import { walletOperationModel } from 'src/app/models/walletOperationModel';
import { BinanceServiceService } from 'src/app/services/binance-service.service';
import { OperationsService } from 'src/app/services/operations.service';
import { PnlService } from 'src/app/services/pnl.service';
import { WalletService } from 'src/app/services/wallet.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-wallet-detail',
  templateUrl: './wallet-detail.component.html',
  styleUrls: ['./wallet-detail.component.css']
})
export class WalletDetailComponent implements OnInit {

  walletId:number;
  recentOperations:RecentOperationModel[]=[]
  walletRecentOperations:walletOperationModel[]=[]
  selectedItems:walletOperationModel[] = [];
  dropdownSettings:IDropdownSettings = {};
  coinSymbol:string
  selectedRecentOperationId:number
  selectedOperation = {}
  constructor(
    private activatedRoute:ActivatedRoute,
    private walletService:WalletService,
    private toastrService:ToastrService,
    private operationsService:OperationsService,
    private pnlService:PnlService,
    public binanceService:BinanceServiceService
  
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.walletId=params['walletid']
      if(this.walletId){
        this.walletId =  this.walletId ;
        this.getWalletOperations(this.walletId)
      }
    })

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'id',
      textField: 'coinsymbol',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      
    };
  }

  getWalletOperations(id:number){
    this.walletService.getWalletOperations(id).subscribe((data)=>{
      this.walletRecentOperations=data
    })
  }

  getRecentOperations(){
    this.operationsService.getRecentOperations().subscribe((data)=>{
      this.recentOperations = data
    })
  }

  addWalletOperation(){
    let walletOperation = {
      operationid:this.selectedRecentOperationId,
      walletid:+this.walletId
    }
    console.log(walletOperation)
    this.walletService.addWalletOperation(walletOperation).subscribe((data)=>{
      this.toastrService.success("Cüzdanınıza Eklendi", "Başarılı!")
      this.ngOnInit()
    }, (error)=>{
      this.toastrService.error("Cüzdanınıza Eklenemedi", "Başarısız!")
    })
  }

  setSelectedOperation(walletOperation:walletOperationModel){
    this.selectedOperation={
      id:walletOperation.id
    }
  }
  

  deleteWalletOperation(){
    console.log(this.selectedOperation)
    this.walletService.deleteWalletOperation(this.selectedOperation).subscribe((data)=>{
      this.toastrService.success("Coin Cüzdandan Silindi", "Başarılı!")
      this.ngOnInit()
    }, (error)=>{
      this.toastrService.error("Coin Cüzdandan Silinemedi", "Başarısız!")
      console.log(error)
    })
  }


  pnlCalculate(amount: number, cost: number, price: number, coinsymbol:string): number {
    return this.pnlService.profitLoss(amount, cost, price, coinsymbol, false);
  }

  pnlCalculatePercent(cost: number, price: number): number {
    return this.pnlService.profitLossPercent(cost, price);
  }

  setOperationId(item: any) {
    this.selectedRecentOperationId=item.id
    console.log(this.selectedRecentOperationId)
  }

  onSelectAll(items: any) {
    console.log(items);
  }

}
