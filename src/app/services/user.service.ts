import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserModel } from '../models/userModel';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  apiUrl:string= environment.apiUrl + "/api/"
  

  constructor(private httpClient:HttpClient) { }

  getUser():Observable<UserModel>{
    let newPath = this.apiUrl+"users/getcurrentuser"
    return this.httpClient.get<UserModel>(newPath)
  }
}
