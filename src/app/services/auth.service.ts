import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ResultModel } from '../models/resultModel';
import { TokenModel } from '../models/tokenModel';
import { UserModel } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl:string="http://127.0.0.1:8000/api/auth/"
  token:TokenModel;
  constructor(private httpClient:HttpClient) { }

  login(userModel:UserModel):Observable<TokenModel>{
    let newPath = this.apiUrl+"login"
    return this.httpClient.post<TokenModel>(newPath, userModel)
  }

  isAuthenticated():boolean{
    if(localStorage.getItem("token")){
      return true
    }else{
      return false
    }
  }

  register(userModel:UserModel):Observable<ResultModel>{
    let newPath = this.apiUrl + "register"
    return this.httpClient.post<ResultModel>(newPath, userModel)
  }

}
