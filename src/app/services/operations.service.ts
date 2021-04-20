import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecentOperationModel } from '../models/recentOperationModel';
@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  recentOperationsModel:RecentOperationModel[];

  apiUrl:string="http://127.0.0.1:8000/api/"
  

  constructor(private httpClient:HttpClient) { }

  
  getRecentOperations():Observable<RecentOperationModel[]>{
    let newPath = this.apiUrl+"operations/getall"
    return this.httpClient.get<RecentOperationModel[]>(newPath)
  }

}
