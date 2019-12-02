import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { ThreatDetectionService } from 'app/core/services/threat-detection.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restricted',
  templateUrl: './restricted.component.html',
  styleUrls: ['./restricted.component.less']
})
export class RestrictedComponent implements OnInit {

  serverData: JSON;

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
