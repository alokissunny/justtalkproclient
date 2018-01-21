import { Component, Input, OnInit,ViewChild,ElementRef } from '@angular/core';

import { NbMenuService, NbSidebarService, NbSearchService } from '@nebular/theme';
import { UserService } from '../../../_services/user.service';
import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../_services/authentication.service';
import { appConfig } from '../../../app.config';
import { GoogleService } from '../../../_services/google.service';
import { NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
declare var google: any;
@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @ViewChild("search")
    public searchElementRef: ElementRef;
  @Input() position = 'normal';

  user: any;
  noncurloc = false;
  place:any ;
  userMenu = [{ title: 'Login' }];
  location = '';

  constructor(private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private userService: UserService,
    private analyticsService: AnalyticsService,
    private router: Router,
    private authenticationService: AuthenticationService, private searchService: NbSearchService,
    private googleService: GoogleService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
  }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    if (this.userService.isSessionActive())
      this.user.picture = appConfig.apiUrl + "/images/" + this.user.photo;
    this.authenticationService.onLogin.subscribe(() => {
      this.user = this.userService.getCurrentUser();
      this.user.picture = appConfig.apiUrl + "/images/" + this.user.photo;
    });
    // this.searchService.onSearchSubmit().subscribe(evt => {
    //   this.googleService.getGoogleLocation(evt.term).subscribe((res) => {
    //     this.userService.curLat = res.results[0].geometry.location.lat;
    //     this.userService.curLng = res.results[0].geometry.location.lng;
    //     this.userService.currentLocationChanged.next({});
    //     this.noncurloc = true;
    //   });
    // });
    this.autoComplete();
  }
  search(evt) {
    console.log(evt);
    this.googleService.getGoogleLocation(evt).subscribe((res) => {
        this.userService.curLat = res.results[0].geometry.location.lat;
        this.userService.curLng = res.results[0].geometry.location.lng;
        this.userService.currentLocationChanged.next({});
        this.noncurloc = true;
      });
  }
  autoComplete() {
    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          this.place = autocomplete.getPlace();

          //verify result
          if (this.place.geometry === undefined || this.place.geometry === null) {
            this.search(this.place.name);
            return;
          }
        });
      });
    });
  }
  useloc() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.userService.curLat = position.coords.latitude;
        this.userService.curLng = position.coords.longitude;
        this.userService.currentLocationChanged.next({});
        this.noncurloc = false;
        this.location = '';
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
    if (this.userService.isSessionActive()) {
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
    if (event.title === 'Log out') {
      this.authenticationService.logout();
      this.router.navigateByUrl('/login');
    }
    if (event.title === 'Login') {
      this.router.navigateByUrl('/login');
    }
    if (event.title === 'Profile') {
      this.router.navigateByUrl('/pages/profile/me');
    }
  }
}
