/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import {  UserService } from './_services/index';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  lat: Number;
  lng : Number;
  constructor(private analytics: AnalyticsService , private userService: UserService) {
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
  }
}
