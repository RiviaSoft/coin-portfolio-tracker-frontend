import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RecentOperationModel } from 'src/app/models/recentOperationModel';
import { WalletService } from 'src/app/services/wallet.service';

@Component({
  selector: 'app-wallet-detail',
  templateUrl: './wallet-detail.component.html',
  styleUrls: ['./wallet-detail.component.css']
})
export class WalletDetailComponent implements OnInit {

  walletOperations:RecentOperationModel[]=[]
  walletId:number;
  constructor(
    private activatedRoute:ActivatedRoute,
    private walletService:WalletService,
    private toastrService:ToastrService,
  
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
    this.walletService.getWalletOperations(walletId).subscribe((data)=>{
      console.log(data)
    })
  }

  addWalletOperation(){

  }

  deleteWalletOperation(){

  }

}
