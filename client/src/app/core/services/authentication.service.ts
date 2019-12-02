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

  accountCreate = '/api/accounts/account/create';
  accountAuthenticate = '/api/accounts/account/authentication';
  accountTokenRefresh = '/api/accounts/account/refresh_token';

  constructor(private http: HttpClient) { }

  accountRegister(inputData): Observable<ResponseModel> {
    return this.http.post('http://127.0.0.1:5000/api/scan', { url: inputData })
      .map((response: ResponseModel) => response).catch((err: any) => Observable.throw(err.error || 'error'));
  }

  accountLogin(inputData): Observable<ResponseModel> {
    return this.http.post('http://127.0.0.1:5000/api/scan', { url: inputData })
      .map((response: ResponseModel) => response).catch((err: any) => Observable.throw(err.error || 'error'));
  }

  accountSessionRefresh(inputData): Observable<ResponseModel> {
    return this.http.post('http://127.0.0.1:5000/api/scan', { url: inputData })
      .map((response: ResponseModel) => response).catch((err: any) => Observable.throw(err.error || 'error'));
  }
}