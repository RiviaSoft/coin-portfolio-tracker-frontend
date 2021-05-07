import { Component, OnInit } from '@angular/core';
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

  constructor(
    private walletService:WalletService,
    private toastrService:ToastrService,
  
    ) { }

  ngOnInit(): void {
  }

  getWalletOperations(){
    this.walletService.getWalletOperations().subscribe((data)=>{
      
    })
  }

}
