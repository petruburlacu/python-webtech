import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-restricted',
  templateUrl: './restricted.component.html',
  styleUrls: ['./restricted.component.less']
})
export class RestrictedComponent implements OnInit {

  serverData: JSON;
  employeeData: JSON;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  getConnection() {
    this.httpClient.get('http://localhost:5000/').subscribe(data => {
      this.serverData = data as JSON;
      console.log(this.serverData);
    })
  }

  getAllAccounts() {
    this.httpClient.get('http://localhost:5000/accounts').subscribe(data => {
      this.employeeData = data as JSON;
      console.log(this.employeeData);
    })
  }

}
