import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { RecentOperationModel } from 'src/app/models/recentOperationModel';
import { WalletModel } from 'src/app/models/walletModel';
import { WalletService } from 'src/app/services/wallet.service';


@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.css']
})
export class WalletsComponent implements OnInit {
  
  wallets:WalletModel[]=[]
  recentOperations:any[]=[]
  selectedOperationIds:Number[]=[]
  dropdownSettings={};
  constructor(private walletService:WalletService) { }
  
  ngOnInit(): void {
    this.recentOperations = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.getWallets();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      itemsShowLimit: 5,
      allowSearchFilter: true,
      closeDropDownOnSelection:false
    };
  }


  getWallets(){
    this.walletService.getWallets().subscribe((data)=>{
      data.forEach(element => {
        this.wallets.push(element)
      });
    })
  }

  addCoin2Wallet(operationId:any){

  }


}
