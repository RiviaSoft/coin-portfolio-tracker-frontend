import { Component, OnDestroy, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RecentOperationModel } from 'src/app/models/recentOperationModel';
import { OperationsService } from 'src/app/services/operations.service';
import { PnlService } from 'src/app/services/pnl.service';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { ArchivedOperationModel } from 'src/app/models/archivedOperationModel';
import { BinanceServiceService } from 'src/app/services/binance-service.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  recentOperations: RecentOperationModel[] = [];
  addCoinForm: FormGroup;
  addArchivedOperationForm: FormGroup;
  dropdownList: any = [];
  coinSymbolText: any;
  coinsymbol: any;
  coinPairsList:string[];
  dropdownSettings: IDropdownSettings;
  selectedModal:RecentOperationModel={coinsymbol:"", coinamount:0, id:0, buycost:0, userid:0};
  filterText:string;

  constructor(
    private pnlService: PnlService,
    private operationsService: OperationsService,
    public binanceService:BinanceServiceService,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private userService: UserService,
  ) {}
  

  ngOnInit(): void {
    this.getCurrentUser();
    
    this.getRecentOperations();
    setTimeout(() => {
      this.getCoinPrice();
    }, 1200);
    
    this.createAddCoinForm();
    this.createArchivedOperationForm();
    this.dropdownSettings = {
      singleSelection: true,
      textField: 'item_text',
      itemsShowLimit: 5,
      allowSearchFilter: true,
      closeDropDownOnSelection:true
    };
  }

  getCoinPrice(){
    this.recentOperations.forEach(element => {
      this.binanceService.openWebSocket(element.coinsymbol.toLowerCase());
    });
  }

  setSelectedModal(operation:RecentOperationModel){
    this.selectedModal=operation
  }

  setCoinSymbol(item: any) {
    this.coinSymbolText = item;
  }

  totalCostCalculate(amount: number, cost: number){
    return this.pnlService.totalCostCalculate(amount, cost)
  }

  totalValueCalculate(amount: number, price: number): number {
    let stringValue = (amount * price).toFixed(2);
    let totalValue= +stringValue
    return totalValue 
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
    this.coinPairsList = []
    this.coinPairsList =  this.binanceService.getCoinPairs()

  }

  getPrice(coinSymbol:string){
    this.binanceService.openWebSocket(coinSymbol)
  }
}
