import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResultModel } from '../models/resultModel';
import { TokenModel } from '../models/tokenModel';
import { UserModel } from '../models/userModel';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl: string = environment.apiUrl + '/api/auth/';
  token: TokenModel;
  isLogged: boolean;
  constructor(private httpClient: HttpClient) {}

  login(userModel: UserModel): Observable<TokenModel> {
    let newPath = this.apiUrl + 'login';
    return this.httpClient.post<TokenModel>(newPath, userModel);
  }

  isAuthenticated() {
    return new Promise((resolve, reject) => {
      let newUrl = environment.apiUrl + '/api/users/getcurrentuser';
      this.httpClient.get(newUrl).subscribe(
        (data) => {
          this.isLogged = true;
          resolve(this.isLogged)
        },
        (error) => {
          this.isLogged = false;
          resolve(this.isLogged)
        }
      );
    });
  }

  register(userModel: UserModel): Observable<ResultModel> {
    let newPath = this.apiUrl + 'register';
    return this.httpClient.post<ResultModel>(newPath, userModel);
  }
}
