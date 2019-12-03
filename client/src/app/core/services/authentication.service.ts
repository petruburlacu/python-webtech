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

  baseURL = 'http://localhost:8080';
  accountCreate = '/api/accounts/account/create';
  accountAuthenticate = '/api/accounts/account/authentication';
  accountTokenRefresh = '/api/accounts/account/refresh_token';

  isAuthenticated = false;
  accountDetails = null;

  constructor(private http: HttpClient) { }

  accountRegister(inputData): Observable<any> {
    return this.http.post(this.baseURL + this.accountCreate, inputData)
      .map((response: ResponseModel) => response).catch((err: any) => Observable.throw(err.error || 'error'));
  }

  accountLogin(inputData): Observable<any> {
    return this.http.post(this.baseURL + this.accountAuthenticate, inputData)
      .map((response: any) => response).catch((err: any) => Observable.throw(err.error || 'error'));
  }

  accountSessionRefresh(inputData): Observable<any> {
    return this.http.post(this.baseURL + this.accountTokenRefresh, inputData)
      .map((response: any) => response).catch((err: any) => Observable.throw(err.error || 'error'));
  }

  setAuthenticationStatus(status: boolean, details: any) {
    this.isAuthenticated = status;
    this.accountDetails = details;
  }

  getAccountDetails() {
    return this.accountDetails;
  }
  checkAuthentication() {
    if (this.isAuthenticated) {
      return true;
    } else {
      return false;
    }
  }
}