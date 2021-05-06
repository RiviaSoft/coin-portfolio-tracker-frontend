import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { WalletModel } from 'src/app/models/walletModel';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {


  constructor(private httpClient:HttpClient) { }

  apiUrl:string= environment.apiUrl + "/api/"

  getWallets():Observable<WalletModel[]>{
    let newPath = this.apiUrl+"wallets/getall"
    return this.httpClient.get<WalletModel[]>(newPath)
  }

}
