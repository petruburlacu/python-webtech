import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThreatDetectionService } from 'app/core/services/threat-detection.service';
import { Subject } from 'rxjs';
import { map, tap, takeUntil } from 'rxjs/operators';
import { ResponseModel } from 'app/shared/models/ResponseModel';
import { NzMessageService, NzNotificationService } from 'ng-zorro-antd';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit, OnDestroy {

  ngUnsubscribe = new Subject();
  serverData = null;
  linkPreviewData = null;
  googleReporData = null;
  inputData = '';
  isLoading = false;
  isMalicious = false;
  displayImage = new Image();

  constructor(private scanService: ThreatDetectionService, private notification: NzNotificationService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  searchThreat(): void {
    this.isLoading = true;
    this.scanService.scanURL(this.inputData).pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((response: ResponseModel) => {
        console.log(response);
        if (response.status) {
          this.createNotification('success', 'URL Scanned', 'A report has been generated');
          this.serverData = response;
          this.linkPreviewData = response.responseObject.linkPreview;
          this.googleReporData = response.responseObject.googleReport;
          console.log(this.googleReporData);
        } else {
          this.createNotification('warning', 'Warning', 'Something went wrong');
        }
      }, error => {
        console.log(error);
        this.createNotification('error', 'Request failed', error);
      }, () => {
        this.isLoading = false;
      });
  }

  inputKeyPress(event) {
    if (event.which === 13) {
      this.searchThreat();
    }
  }

  createNotification(type: string, title: string, description: string): void {
    this.notification.create(type, title, description);
  }
  // Audit: if retrieved audit is empty => use predefined list
  // Audit: if retrieved audit not empty => add to the predifined list the new entries
}
