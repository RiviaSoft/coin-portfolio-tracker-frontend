import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResultModel } from '../models/dataResultModel';
import { RecentOperationModel } from '../models/recentOperationModel';
@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  recentOperationsModel:ListResultModel<RecentOperationModel>;

  apiUrl:string="http://127.0.0.1:8000/api/"

  constructor(private httpClient:HttpClient) { }

  getRecentOperations(){
    this.httpClient.get<ListResultModel<RecentOperationModel>>(this.apiUrl+"operations/getall").subscribe(response=>{
      this.recentOperationsModel.data =response.data
      console.log(response)
    })
  }

}
