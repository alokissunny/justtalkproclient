/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { UserService } from './_services/index';
import { ToasterService, ToasterConfig, Toast, BodyOutputType } from 'angular2-toaster';
import 'style-loader!angular2-toaster/toaster.css';
import { Router, ActivatedRoute  , NavigationStart, Event as NavigationEvent } from '@angular/router';

@Component({
  selector: 'ngx-app',
  styleUrls: ['./app.scss'],
  template: '<toaster-container style="background: cadetblue;" [toasterconfig]="config"></toaster-container><router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  lat: Number;
  lng: Number;
  position = 'toast-top-right';
  animationType = 'fade';
  //title = 'HI there!';
  //content = `I'm cool toaster!`;
  timeout = 100;
  toastsLimit = 5;
  type = 'default';
  config: ToasterConfig;

  isNewestOnTop = true;
  isHideOnClick = true;
  isDuplicatesPrevented = false;
  isCloseButton = true;

  constructor(private analytics: AnalyticsService, private userService: UserService,
    private activatedRoute: ActivatedRoute, private router: Router) {
    this.config = new ToasterConfig({
      positionClass: this.position,
      timeout: this.timeout,
      newestOnTop: this.isNewestOnTop,
      tapToDismiss: this.isHideOnClick,
      preventDuplicates: this.isDuplicatesPrevented,
      animation: this.animationType,
      limit: this.toastsLimit,
    });
  }

  ngOnInit(): void { 
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.userService.curLat = this.lat;
        this.userService.curLng = this.lng;
      });
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
    if ( !this.userService.isSessionActive() && window.location.href.indexOf('/advisor/fin') === -1
     && window.location.href.indexOf('/#/pages/login') === -1 &&
      window.location.href.indexOf('/#/pages/elogin') === -1) {
               window.location.href = 'home';
            }
  }
}
