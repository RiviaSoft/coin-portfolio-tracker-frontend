import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrentUserModel } from '../models/currentUserModel';
import { UserModel } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl:string="http://127.0.0.1:8000/api/"
  

  constructor(private httpClient:HttpClient) { }

  getUser():Observable<CurrentUserModel>{
    let newPath = this.apiUrl+"users/getcurrentuser"
    return this.httpClient.get<CurrentUserModel>(newPath)
  }
}
