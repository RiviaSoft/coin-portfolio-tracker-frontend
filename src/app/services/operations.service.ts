import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RecentOperationModel } from '../models/recentOperationModel';
import { ArchivedOperationModel } from '../models/archivedOperationModel';
import { ResultModel } from '../models/resultModel';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OperationsService {

  recentOperationsModel:RecentOperationModel[];
  archivedOperationsModel:ArchivedOperationModel[];

  apiUrl:string= environment.apiUrl + "/api/"
  

  constructor(private httpClient:HttpClient) { }

  addRecentOperation(recentOperation:RecentOperationModel):Observable<ResultModel>{
    let newPath = this.apiUrl + "operations/add"
    return this.httpClient.post<ResultModel>(newPath, recentOperation)
  }

  updateRecentOperation(recentOperation:RecentOperationModel):Observable<ResultModel>{
    let newPath = this.apiUrl + "operations/update"
    return this.httpClient.post<ResultModel>(newPath, recentOperation)
  }

  getRecentOperations():Observable<RecentOperationModel[]>{
    let newPath = this.apiUrl+"operations/getall"
    return this.httpClient.get<RecentOperationModel[]>(newPath)
  }

  getRecentOperationById(id:number):Observable<RecentOperationModel>{
    let newPath = this.apiUrl + "operations/get/id:" + id
    return this.httpClient.get<RecentOperationModel>(newPath)
  }

  deleteRecentOperation(operation:RecentOperationModel):Observable<ResultModel>{
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
