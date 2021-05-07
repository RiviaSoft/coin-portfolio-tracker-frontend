import { Component, OnInit } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { RecentOperationModel } from 'src/app/models/recentOperationModel';
import { WalletModel } from 'src/app/models/walletModel';
import { OperationsService } from 'src/app/services/operations.service';
import { WalletService } from 'src/app/services/wallet.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wallets',
  templateUrl: './wallets.component.html',
  styleUrls: ['./wallets.component.css']
})
export class WalletsComponent implements OnInit {
  addWalletForm: FormGroup;
  wallets:WalletModel[]=[]
  recentOperations:RecentOperationModel[]=[]
  selectedOperationIds:Number[]=[]
  dropdownSettings={};
  coinsymbol: any;


  constructor(
    private walletService:WalletService,
    private operationsService:OperationsService,
    private formBuilder:FormBuilder
    ) { }
  
  ngOnInit(): void {
    this.getRecentOperations()
    this.getWallets();
    this.createAddCoinForm();
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'coinsymbol',
      itemsShowLimit: 5,
      allowSearchFilter: true,
      closeDropDownOnSelection:false
    };
  }


  getRecentOperations(){
    this.operationsService.getRecentOperations().subscribe((data)=>{
      this.recentOperations=data
    })
  }

  getWallets(){
    this.walletService.getWallets().subscribe((data)=>{
      data.forEach(element => {
        this.wallets.push(element)
      });
    })
  }

  addWallet(){
    if(this.addWalletForm.valid){
      let wallet:WalletModel = this.addWalletForm.value
      let idNumber:number = + localStorage.getItem("id")
      wallet.userid=idNumber
      this.walletService.addWallet(wallet).subscribe((data)=>{
        console.log(data)
      })
    }
    
  }

  deleteWallet(wallet:WalletModel){
    this.walletService.deleteWallet(wallet).subscribe((data)=>{
      console.log(data)
    })
  }

  refresh(): void {
    window.location.reload();
}

  createAddCoinForm() {
    this.addWalletForm = this.formBuilder.group({
      userid:0,
      name: ['', Validators.required],
    });
  }

  getWalletOperation(){

  }

  addWalletOperation(){

  }

  deleteWalletOperation(){
    
  }


}
