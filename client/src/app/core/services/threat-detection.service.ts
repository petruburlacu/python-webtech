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

  apiReport = '/api';

  constructor(private http: HttpClient) { }

//   {
//     "preview": {
//         "description": "description",
//         "image": "graphicriver.png",
//         "title": "Title,
//         "url": "url.com"
//     },
//     "report": {}
// }


  scanURL(request): Observable<ResponseModel> {
    return this.http.post(this.apiReport, request)
    .map((response: ResponseModel) => response).catch((err: any) => Observable.throw(err.error || 'error'));
  }
}
