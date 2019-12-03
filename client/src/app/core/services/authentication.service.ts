import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from 'app/shared/models/ResponseModel';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseURL = 'http://localhost:5000';
  accountCreate = '/api/accounts/account/create';
  accountAuthenticate = '/api/accounts/account/authentication';
  accountTokenRefresh = '/api/accounts/account/refresh_token';

  isAuthenticated = false;

  constructor(private http: HttpClient) { }

  accountRegister(inputData): Observable<ResponseModel> {
    return this.http.post(this.baseURL + this.accountCreate, inputData)
      .map((response: ResponseModel) => response).catch((err: any) => Observable.throw(err.error || 'error'));
  }

  accountLogin(inputData): Observable<ResponseModel> {
    return this.http.post(this.baseURL + this.accountLogin, inputData)
      .map((response: ResponseModel) => response).catch((err: any) => Observable.throw(err.error || 'error'));
  }

  accountSessionRefresh(inputData): Observable<ResponseModel> {
    return this.http.post(this.baseURL + this.accountTokenRefresh, inputData)
      .map((response: ResponseModel) => response).catch((err: any) => Observable.throw(err.error || 'error'));
  }

  checkAuthentication() {
    if(this.isAuthenticated) {
      return true;
    } else {
      return false;
    }
  }
}