import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService ,NbSearchService} from '@nebular/theme';
import { UserService } from '../../../_services/user.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { Router }   from '@angular/router';
import {AuthenticationService} from '../../../_services/authentication.service';
import {appConfig} from '../../../app.config';
import {GoogleService} from '../../../_services/google.service';
@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {


  @Input() position = 'normal';

  user: any;
  noncurloc = false;

  userMenu = [{ title: 'Login' }];

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private userService: UserService,
              private analyticsService: AnalyticsService,
              private router : Router,
              private authenticationService : AuthenticationService , private searchService: NbSearchService,
              private googleService : GoogleService
              ) {
  }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    if(this.userService.isSessionActive())
    this.user.picture = appConfig.apiUrl +"/images/"+ this.user.photo;
    this.authenticationService.onLogin.subscribe(() => {
        this.user = this.userService.getCurrentUser();
        this.user.picture = appConfig.apiUrl +"/images/"+ this.user.photo;
    });
    this.searchService.onSearchSubmit().subscribe( evt => {
      this.googleService.getGoogleLocation(evt.term).subscribe((res) => {
        this.userService.curLat = res.results[0].geometry.location.lat;
      this.userService.curLng = res.results[0].geometry.location.lng;
      this.userService.currentLocationChanged.next({});
      this.noncurloc = true;
      });
    })
  }
  useloc() {
     if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.userService.curLat = position.coords.latitude;
          this.userService.curLng = position.coords.longitude;
          this.userService.currentLocationChanged.next({});
          this.noncurloc = false;
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
  }
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
     if(event.title === 'Profile')
    {
      this.router.navigateByUrl('/pages/profile/me');
    }
  }
}
