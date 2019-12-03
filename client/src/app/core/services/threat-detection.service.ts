import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseModel } from 'app/shared/models/ResponseModel';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class ThreatDetectionService {

  // TODO: Create a constants class
  baseUrl = 'http://127.0.0.1:8080';
  scanUrl = '/api/scan';
  threatReport = '/api/threats';

  constructor(private http: HttpClient) { }

  scanURL(inputData): Observable<ResponseModel> {
    return this.http.post(this.baseUrl + this.scanUrl, { url: inputData })
      .map((response: ResponseModel) => response).catch((err: any) => Observable.throw(err.error || 'error'));
  }

  getThreats(): Observable<ResponseModel> {
    return this.http.get(this.baseUrl + this.threatReport)
      .map((response: ResponseModel) => response).catch((err: any) => Observable.throw(err.error || 'error'));
  }
}
