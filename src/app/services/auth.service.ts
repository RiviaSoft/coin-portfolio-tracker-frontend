import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenModel } from '../models/tokenModel';
import { UserModel } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl:string="http://127.0.0.1:8000/api/auth/"
  token:TokenModel;
  error:any;
  constructor(private httpClient:HttpClient) { }

  login(userModel:UserModel):Observable<TokenModel>{
      return this.httpClient.post<TokenModel>(this.apiUrl+"login", userModel)
  }

  isAuthenticated():boolean{
    if(localStorage.getItem("token")){
      return true
    }else{
      return false
    }
  }

  

}
