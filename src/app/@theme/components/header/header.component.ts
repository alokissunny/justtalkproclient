import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';
import { UserService } from '../../../_services/user.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { Router }   from '@angular/router';
import {AuthenticationService} from '../../../_services/authentication.service';
@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';

  user: any;

  userMenu = [{ title: 'Login' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService,
              private router : Router,
              private authenticationService : AuthenticationService) {
  }

  ngOnInit() {
    // this.userService.getUsers()
    //   .subscribe((users: any) => this.user = users.rupsu);
    this.user = this.userService.getCurrentUser();
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');
    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }
  getmenu() {
    if(this.userService.isSessionActive())
    {
      this.userMenu = [{ title: 'Profile' }, { title: 'Log out' }];
    }
    else {
      this.userMenu = [{ title: 'Login' }];
    }
    return this.userMenu;
  }
  navigateToMessage() {
    this.router.navigateByUrl('/pages/messages');
  }
  menuClick(event) {
    if(event.title === 'Log out')
    {
      this.authenticationService.logout();
      this.router.navigateByUrl('/login');
    }
     if(event.title === 'Login')
    {
      this.router.navigateByUrl('/login');
    }
  }
}
