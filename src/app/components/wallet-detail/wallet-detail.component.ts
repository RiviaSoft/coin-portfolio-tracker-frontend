import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RecentOperationModel } from 'src/app/models/recentOperationModel';
import { walletOperationModel } from 'src/app/models/walletOperationModel';
import { BinanceServiceService } from 'src/app/services/binance-service.service';
import { OperationsService } from 'src/app/services/operations.service';
import { PnlService } from 'src/app/services/pnl.service';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-wallet-detail',
  templateUrl: './wallet-detail.component.html',
  styleUrls: ['./wallet-detail.component.css']
})
export class WalletDetailComponent implements OnInit {

  walletRecentOperations:RecentOperationModel[]=[]
  walletId:number;

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
      if(params['walletid']){
        this.walletId =  params['walletid'] ;
        this.walletService.getWalletRecentOperations(params['walletid'])
        setTimeout(() => {
        this.getWalletOperations()
        }, 3000);
      }
    })
  }


  getWalletOperations(){
    this.walletRecentOperations = this.walletService.walletRecentOperations
  }


  addWalletOperation(){

  }

  deleteWalletOperation(){

  }


  pnlCalculate(amount: number, cost: number, price: number, coinsymbol:string): number {
    return this.pnlService.profitLoss(amount, cost, price, coinsymbol, false);
  }

  pnlCalculatePercent(cost: number, price: number): number {
    return this.pnlService.profitLossPercent(cost, price);
  }

}
