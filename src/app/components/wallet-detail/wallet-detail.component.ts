import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RecentOperationModel } from 'src/app/models/recentOperationModel';
import { walletOperationModel } from 'src/app/models/walletOperationModel';
import { OperationsService } from 'src/app/services/operations.service';
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
    private operationsService:OperationsService
  
    ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if(params['walletid']){
        this.walletId =  params['walletid'] ;
        this.getWalletOperations(params['walletid'])
      }
    })

  }


  getWalletOperations(walletId:number){
    this.walletRecentOperations= this.walletService.getWalletRecentOperations(walletId)
    console.log(this.walletRecentOperations)
  }


  addWalletOperation(){

  }

  deleteWalletOperation(){

  }

}
