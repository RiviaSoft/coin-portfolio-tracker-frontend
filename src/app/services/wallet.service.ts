import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WalletModel } from 'src/app/models/walletModel';
import { Observable } from 'rxjs';
import { ResultModel } from '../models/resultModel';
import { RecentOperationModel } from '../models/recentOperationModel';

@Injectable({
  providedIn: 'root'
})
export class WalletService {


  constructor(
    private httpClient:HttpClient,
    ) { }

  apiUrl:string= environment.apiUrl + "/api/"

  getWallets():Observable<WalletModel[]>{
    let newPath = this.apiUrl+"wallets/getall"
    return this.httpClient.get<WalletModel[]>(newPath)
  }

  addWallet(wallet:WalletModel):Observable<ResultModel>{
    let newPath = this.apiUrl+"wallets/add"
    return this.httpClient.post<ResultModel>(newPath, wallet)
  }

  deleteWallet(wallet:WalletModel):Observable<ResultModel>{
    let newPath = this.apiUrl+"wallets/delete"
    return this.httpClient.post<ResultModel>(newPath, wallet)
  }

  getWalletOperations():Observable<RecentOperationModel[]>{
    let newPath = this.apiUrl+"walletoperations/getall"
    return this.httpClient.get<RecentOperationModel[]>(newPath)
  }

  addWalletOperation(){

  }

  deleteWalletOperation(){
    
  }

}
