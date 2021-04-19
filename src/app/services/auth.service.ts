import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { loginModel } from '../models/LoginModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl:string="http://127.0.0.1:8000/api/auth/"

  constructor(private httpClient:HttpClient) { }

  login(loginModel:loginModel){
      return this.httpClient.post(this.apiUrl+"login", loginModel)
  }

  isAuthenticated():boolean{
    if(localStorage.getItem("token")){
      return true
    }else{
      return false
    }
  }
}
