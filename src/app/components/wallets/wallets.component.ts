import { Component, OnInit, ViewChild} from '@angular/core';
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
import { ToastrService } from 'ngx-toastr';

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
    private formBuilder:FormBuilder,
    private toastrService:ToastrService,

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
      } );
    })
  }

  addWallet(){
    if(this.addWalletForm.valid){
      let wallet:WalletModel = this.addWalletForm.value
      let idNumber:number = + localStorage.getItem("id")
      wallet.userid=idNumber
      this.walletService.addWallet(wallet).subscribe((data)=>{
        this.toastrService.success("Cüzdan Eklendi", "Başarılı!")
        window.location.reload();
      }, (error)=>{
        this.toastrService.error("Cüzdan Eklenemedi", "Başarısız!")
        window.location.reload();
      })
    }
  }

  deleteWallet(wallet:WalletModel){
    this.walletService.deleteWallet(wallet).subscribe((data)=>{
      this.toastrService.success("Cüzdan Silindi", "Başarılı!");
      window.location.reload();
    })
  }

  createAddCoinForm() {
    this.addWalletForm = this.formBuilder.group({
      userid:0,
      name: ['', Validators.required],
    });
  }

  setSelectedWallet(id:number){
    
  }

}
