import { Injectable } from '@angular/core';
import {advisors} from './dummydata';
import { Observable } from 'rxjs/Observable';
import {Advisor} from '../../_models/advisormodel'
import { ReplaySubject } from 'rxjs';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {UserService} from '../../_services/user.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Injectable()
export class AdvisorService {

  constructor(private http: Http , private userService: UserService , private router : Router) { }
  getAdvisor(cat: String,curLat?,curLng?) {
    if(cat === 'fav') {
      if(this.userService.isSessionActive())
      return this.http.get('/advisors/fav/'+this.userService.getCurrentUser().username).map((response: Response) => response.json());
      else {
        this.router.navigateByUrl('/login');
      }
     }
    if(!curLat || !curLng) {
      curLat = this.userService.getCurrentUser().lat;
      curLng = this.userService.getCurrentUser().lng;
    }
    let params = "?"+"lat="+curLat+"&lng="+curLng;

    return this.http.get('/advisors/get/'+cat+params).map((response: Response) => response.json());
  }

}
