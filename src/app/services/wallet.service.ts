import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WalletModel } from 'src/app/models/walletModel';
import { Observable } from 'rxjs';
import { ResultModel } from '../models/resultModel';
import { RecentOperationModel } from '../models/recentOperationModel';
import { walletOperationModel } from '../models/walletOperationModel';

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

  getWalletOperations(id:number):Observable<walletOperationModel>{
    let newPath = this.apiUrl+"walletoperations/getall"
    let stringId= id.toString()
    return this.httpClient.get<walletOperationModel>(newPath, {params:{id:stringId}})
  }

  addWalletOperation(){

  }

  deleteWalletOperation(){
    
  }

}
