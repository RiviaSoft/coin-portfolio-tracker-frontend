import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { RecentOperationModel } from 'src/app/models/recentOperationModel';
import { ResultModel } from 'src/app/models/resultModel';
import { OperationsService } from 'src/app/services/operations.service';
import { PnlService } from 'src/app/services/Pnl.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {
  FormGroup,
  FormControl,
  Validator,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ArchivedOperationModel } from 'src/app/models/archivedOperationModel';
import { BinanceServiceService } from 'src/app/services/binance-service.service';
import { coinPairs } from 'src/app/models/coinPairs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  recentOperations: RecentOperationModel[];
  addCoinForm: FormGroup;
  addArchivedOperationForm: FormGroup;
  dropdownList: any = [];
  coinSymbolText: any;
  coinsymbol: any;
  coinPairs:coinPairs[];
  dropdownSettings: IDropdownSettings;
  selectedModal:RecentOperationModel={coinsymbol:"", coinamount:0, id:0, buycost:0, userid:0};


  constructor(
    private pnlService: PnlService,
    private operationsService: OperationsService,
    private binanceService:BinanceServiceService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router:Router
  ) {}

  ngOnInit(): void {
    this.getCoinPairs();
    this.getCurrentUser();
    this.getRecentOperations();
    this.createAddCoinForm();
    this.createArchivedOperationForm()

    this.dropdownSettings = {
      singleSelection: true,
      idField: 'item_id',
      textField: 'item_text',
      itemsShowLimit: 5,
      allowSearchFilter: true,
    };
  }

  setSelectedModal(operation:RecentOperationModel){
    this.selectedModal=operation
  }

  setCoinSymbol(item: any) {
    this.coinSymbolText = item.item_text;
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

  getRecentOperations() {
    this.operationsService.getRecentOperations().subscribe((response) => {
      this.recentOperations = response;
    });
  }

  getRecentOperationsById(id: number) {
    this.operationsService.getRecentOperationById(id).subscribe((response) => {
      console.log(response);
    });
  }

  deleteRecentOperation(operation: RecentOperationModel) {
    this.operationsService
      .deleteRecentOperation(operation)
      .subscribe((response) => {
        this.toastrService.success('İşlem silindi.', 'Başarılı');
        this.ngOnInit();
      });
  }

  createAddCoinForm() {
    this.addCoinForm = this.formBuilder.group({
      userid:0,
      coinsymbol:'',
      coinamount: ['', Validators.required],
      buycost: ['', Validators.required],
    });
  }

  createArchivedOperationForm() {
    this.addArchivedOperationForm = this.formBuilder.group({
      userid:0,
      buycost:0,
      coinsymbol:'',
      coinamount: ['', Validators.required],
      sellcost: ['', Validators.required],
    });
  }

  getCurrentUser() {
    this.userService.getUser().subscribe((response) => {
      localStorage.setItem("id", response.id.toString())
    });
  }

  addRecentOperation() {      
    if (this.addCoinForm.valid) {
      let recentOperation = this.addCoinForm.value;
      let idNumber:number = + localStorage.getItem("id")
      recentOperation.userid = idNumber;
      recentOperation.coinsymbol = this.coinSymbolText;
      this.operationsService.addRecentOperation(recentOperation).subscribe((data) => {
          this.toastrService.success("Coin Eklendi","Başarılı")
          this.ngOnInit()
        });
    } else {
      this.toastrService.error("Coin Eklenmedi","Başarısız")
    }
  }

  addArchivedOperation(){
    if (this.addArchivedOperationForm.valid) {
      let archivedOperation:ArchivedOperationModel=this.addArchivedOperationForm.value
      archivedOperation.coinsymbol=this.selectedModal.coinsymbol;
      archivedOperation.buycost=this.selectedModal.buycost;
      archivedOperation.userid=this.selectedModal.userid
      
      this.operationsService.addArchivedOperation(archivedOperation).subscribe(data=>{
        this.toastrService.success("Coin Satıldı","Başarılı")
        this.ngOnInit()
      })
    }
    else{
      this.toastrService.error("Coin Satılamadı","Başarısız")
    }
  }
    
  getCoinPairs(){
    this.binanceService.getCoins().then(data => {
      this.coinPairs=data
    }); 

  }


}
