import { Component, OnInit, OnDestroy } from '@angular/core';
import { ThreatDetectionService } from 'app/core/services/threat-detection.service';
import { Subject } from 'rxjs';
import { map, tap, takeUntil } from 'rxjs/operators';
import { ResponseModel } from 'app/shared/models/ResponseModel';
import { NzMessageService } from 'ng-zorro-antd';
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
  displayImage = new Image();

  constructor(private scanService: ThreatDetectionService, private message: NzMessageService, private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.testData();
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
          this.message.success('Report available');
          this.serverData = response;
          this.linkPreviewData = response.responseObject.linkPreview;
          this.googleReporData = response.responseObject.googleReport;
        } else {
          this.message.warning('Something went wrong');
        }
      }, error => {
        console.log(error);
        this.message.error('Request failed');
      }, () => {
        this.isLoading = false;
      });
  }

  // Audit: if retrieved audit is empty => use predefined list
  // Audit: if retrieved audit not empty => add to the predifined list the new entries


  testData() {
    this.serverData = {
      "message": "Success",
      "responseObject": {
        "googleReport": {
          "matches": [
            {
              "cacheDuration": "300s",
              "platformType": "ANY_PLATFORM",
              "threat": {
                "url": "http://testsafebrowsing.appspot.com/s/phishing.html"
              },
              "threatEntryType": "URL",
              "threatType": "SOCIAL_ENGINEERING"
            }
          ]
        },
        "linkPreview": {
          "description": "Forbidden by robots.txt",
          "error": 423,
          "image": '',
          "url": "websiteurl.com"
        }
      },
      "status": true
    };
    this.linkPreviewData = this.serverData.responseObject.linkPreview;
    this.googleReporData = this.serverData.responseObject.googleReport;
  }
}
