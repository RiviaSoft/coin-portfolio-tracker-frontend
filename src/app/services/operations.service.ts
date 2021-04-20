import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecentOperationsModel } from '../models/recentOperationsModel';
@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  recentOperationsModel:RecentOperationsModel[] = [];

  apiUrl:string="http://127.0.0.1:8000/api/"

  constructor(private httpClient:HttpClient) { }

  getRecentOperations(){
    this.httpClient.get<RecentOperationsModel[]>(this.apiUrl+"operations/getall").subscribe(response=>{
      this.recentOperationsModel=response
      console.log(response)
    })
  }

}
