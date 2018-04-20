import { Component ,OnInit} from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { MENU_ITEMS_ADVISOR } from './pages-menu';
import {UserService} from '../_services/user.service';
import {AuthenticationService} from '../_services/authentication.service';
@Component({
  selector: 'ngx-pages',
  template: `
    <ngx-sample-layout>
      <nb-menu [items]="menu" ></nb-menu>
      <router-outlet></router-outlet>
    </ngx-sample-layout>
  `,
})
export class PagesComponent implements OnInit {
  menu = [];
constructor( private userService: UserService , private auth : AuthenticationService) {

}

ngOnInit() {
  this.auth.onLogin.subscribe((res) => {
    this.getMenu();
  });
  this.getMenu();

}
getMenu(){
  if(this.userService.isSessionActive())
  {
this.menu = MENU_ITEMS_ADVISOR;
  }
  else {
this.menu = MENU_ITEMS;
  }
}
}
