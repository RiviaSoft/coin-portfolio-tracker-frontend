import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl:string="http://127.0.0.1:8000/api/"
  

  constructor(private httpClient:HttpClient) { }

  getUser():Observable<UserModel>{
    let newPath = this.apiUrl+"users/getcurrentuser"
    return this.httpClient.get<UserModel>(newPath)
  }
}
