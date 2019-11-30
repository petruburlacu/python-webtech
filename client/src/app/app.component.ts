import { Component, OnInit } from '@angular/core';
import { MenuItem } from './shared/models/menu-item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  title = 'client';
  navMenu: MenuItem[] = [];

  ngOnInit() {
    this.getNavMenu();
  }

  getNavMenu(): void {
    this.navMenu = [
      {title: 'First Item', action: null},
      {title: 'Second Item', action: null},
    ];
  }
}
