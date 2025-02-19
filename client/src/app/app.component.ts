import { Component, OnInit } from '@angular/core';
import { MenuItem } from './shared/models/menu-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {

  title = 'client';
  navMenu: MenuItem[] = [];

  constructor(private router: Router) {}

  ngOnInit() {
    this.getNavMenu();
  }

  getNavMenu(): void {
    this.navMenu = [
      {title: 'Home', action: () => this.router.navigate(['/home'])},
      {title: 'Authentication', action: () => this.router.navigate(['/login'])},
      {title: 'Latest Threats', action: () => this.router.navigate(['/threats'])},
      {title: 'About', action: () => this.router.navigate(['/about'])}
    ];
  }
}
