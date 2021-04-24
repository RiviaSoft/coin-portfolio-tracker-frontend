import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecentOperationModel } from '../models/recentOperationModel';
import { ArchivedOperationModel } from '../models/archivedOperationModel';
import { ResultModel } from '../models/resultModel';
@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  recentOperationsModel:RecentOperationModel[];
  archivedOperationsModel:ArchivedOperationModel[];

  apiUrl:string="http://127.0.0.1:8000/api/"
  

  constructor(private httpClient:HttpClient) { }

  getRecentOperations():Observable<RecentOperationModel[]>{
    let newPath = this.apiUrl+"operations/getall"
    return this.httpClient.get<RecentOperationModel[]>(newPath)
  }

  getRecentOperationById(id:number):Observable<RecentOperationModel>{
    let newPath = this.apiUrl + "/operations/get/id:" + id
    return this.httpClient.get<RecentOperationModel>(newPath)
  }

  deleteRecentOperation(operation:RecentOperationModel):Observable<ResultModel>{
    console.log(operation)
    let newPath = this.apiUrl+"operations/delete"
    return this.httpClient.post<ResultModel>(newPath, operation)

  }


  getArchivedOperations():Observable<ArchivedOperationModel[]>{
    let newPath = this.apiUrl+"archivedoperations/getall"
    return this.httpClient.get<ArchivedOperationModel[]>(newPath)
  }

  addArchivedOperation(operation:RecentOperationModel):Observable<ResultModel>{
    let newPath = this.apiUrl+"archivedoperations/add"
    return this.httpClient.post<ResultModel>(newPath, operation)
  }

  deleteArchivedOperation(ArchivedOperation:ArchivedOperationModel):Observable<ResultModel>{
    let newPath = this.apiUrl+"archivedoperations/delete"
    return this.httpClient.post<ResultModel>(newPath, ArchivedOperation)
  }
}
