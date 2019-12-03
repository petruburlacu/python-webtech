import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ThreatDetectionService } from 'app/core/services/threat-detection.service';
import { NzNotificationService } from 'ng-zorro-antd';

@Component({
  selector: 'app-threats',
  templateUrl: './threats.component.html',
  styleUrls: ['./threats.component.less']
})
export class ThreatsComponent implements OnInit {

  serverData;
  isLoading = false;

  listOfDisplayData: any[] = [];

  constructor(private detectionService: ThreatDetectionService,  private notification: NzNotificationService) { }

  ngOnInit() {
    this.retrieveReport();
  }

  retrieveReport(): void {
    this.isLoading = true;
    this.detectionService.getThreats().subscribe((response) => {
        this.createNotification('success', 'Threats', 'Latest threats retrieved');
        this.serverData = response.responseObject.data;
      }, error => {
        console.log(error);
        this.createNotification('error', 'Request failed', error);
      }, () => {
        this.isLoading = false;
      });
  }

  createNotification(type: string, title: string, description: string): void {
    this.notification.create(type, title, description);
  }

  currentPageDataChange($event: any[]): void {
    this.listOfDisplayData = $event;
  }
}
